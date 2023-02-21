import { useState, useEffect, useMemo} from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setProducts, toggleChangeView, toggleShowFilter } from "@/store/product.slice";
import { setCarts } from "@/store/cart.slice";
import { setIsLoading } from "@/store/general.slice";
import Filter from "@/components/Filter"
import Layout from "@/components/Layout"
import styles from '@/styles/General.module.css'
import Table from "@/components/Table";
import Head from "next/head";
import CardBox from "@/components/CardBox";
import { isMobile } from "react-device-detect";
import Image from "next/image";
import { getProductsDispatcher, getCategoriesDispatcher, getCartsDispatcher } from './api/index';
import Pagination from "@/components/Pagination";
import ShowSelect from "@/components/ShowSelect";
import { BiTable } from 'react-icons/bi'
import { BiGridAlt, BiSearchAlt } from 'react-icons/bi';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { MdClear } from 'react-icons/md';
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  const totalProduct = useSelector(state => state.product.total);
  const showFilter = useSelector(state => state.product.showFilter);
  const isTableView = useSelector(state => state.product.isTableView);
  const [params, setParams] = useState({
    skip: 0,
    limit: 5,
    page: 1,
    selectedCategory: '',
    searchInput: ''
  })

  useEffect(() => {
    if (isMobile) dispatch(toggleShowFilter(false))
    getCategories()
    getCarts()
  }, [])

  useEffect(() => {
    getProducts();
  }, [params])

  const getProducts = () => {
    dispatch(setIsLoading(true));
    const queryParams = {
      limit: params.limit,
      skip: params.skip,
      ...(params.searchInput && {q : params.searchInput}),
      ...(params.selectedCategory && {category: params.selectedCategory})
    };

    getProductsDispatcher(queryParams)
    .then(res => {
      const {data} = res;
      dispatch(setProducts(data));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
  }

  const getCarts = () => {
    const queryParams = {
      limit: params.limit,
      skip: params.skip,
    };
    getCartsDispatcher(queryParams)
    .then(res => {
      const {data} = res;
      dispatch(setCarts(data))
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const getCategories = () => {
    getCategoriesDispatcher()
    .then(res => {
      const {data} = res;
      dispatch(setCategories(data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const generateProductDetail = (data) => {
    return(
      <div className={styles.productDetail}>
        <div>
          <Image src={data.images[0]} height={50} width={50} alt={data.title} />
        </div>
        <div className={styles.product}>
          <div className={styles.name}>{data.title}</div>
          <div className={styles.desc}>{data.description}</div>
        </div>
      </div>
    )
  }

  const handlePage = (type) => {
    if (type === 'prev' && params.page > 1) {
      if(params.page >= 1) {
        setParams({
          ...params,
          page: params.page - 1,
          skip: params.skip-params.limit
        })
      }
    } else if (type === 'next') {
      setParams({
        ...params,
        page: params.page + 1,
        skip: params.skip+params.limit
      })
      }
  }

  const generateProductTable = () => {
    const columns = [{width:'50%', title:'Product'},{width:'10%', title:'Price'}, {width:'10%', title:'Stock'}, {width:'20%', title:'Category'}];
    const data = products.map(item => {
      return [
        generateProductDetail(item),
        `$${item.price}`,
        item.stock,
        item.category
    ];
    }) || [];
    return (
      <div>
        <Table
          data={data}
          columns={columns}
          total={totalProduct}
        />
        <Pagination
            handlePage={handlePage}
            page={params.page}
            limit={params.limit}
            productLength={totalProduct}
            totalData={totalProduct}
        />
      </div>
    );
  }

  const generateProductCard = () => {
    return (
      <>
        <CardBox 
          data={products}
        />
        <Pagination
              handlePage={handlePage}
              page={params.page}
              limit={params.limit}
              productLength={totalProduct}
              totalData={totalProduct}
          />
      </>
    )
  }
  
  const onSelectFilter = (selected) => {
    setParams({
      ...params,
      selectedCategory: selected
    })
    toggleFilter()
  }

  const handleInputSearch = (e) => {
    setParams({
      ...params,
      searchInput: e.target.value
    });
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(handleInputSearch, 300)
  , []);

  const clearSelectedCategory = () => {
    setParams({
      ...params,
      selectedCategory: ''
    })
  }

  const generateToolkit = () => {
    return (
      <>
        <div className={styles.toolkit}>
          <div className={styles.searchBar}>
            <input
              className={styles.input}
              type='text'
              placeholder='Search...'
              onChange={debouncedChangeHandler}
            />
            <BiSearchAlt />
          </div>
          <div className={styles.actionGroup}>
            {params.selectedCategory && 
              <div className={styles.filterBubble}>
                {params.selectedCategory}
                <MdClear 
                  onClick={clearSelectedCategory}
                  className={styles.remove}
                />
              </div>
            }
            <ShowSelect
              limit={params.limit}
              options={[5, 10, 15, 20]}
              handler={onSelectLimit}
            />
            <div className={styles.flex}>
              <div className={styles.toggleProductView}>
                <div className={styles.toggle}>
                  <input type='radio' id='cardView' name="productToggle" checked={!isTableView} onChange={toggleView} />
                  <label onClick={toggleView} htmlFor='cardView' className={styles.first}><BiGridAlt /></label>
                </div>
                <div className={styles.toggle}>
                  <input type='radio' id='tableView' name="productToggle" checked={isTableView} onChange={toggleView} />
                  <label onClick={toggleView} htmlFor='tableView' className={styles.last}><BiTable /></label>
                </div>
              </div>
              <div className={styles.filterWrapper}>
                <div onClick={toggleFilter} className={` ${styles.filterToggle} ${showFilter ? styles.filterActive : ''}`}>
                  <HiAdjustmentsHorizontal />
                </div>
                {showFilter && 
                  <div className={styles.filterBox}>
                    <Filter 
                      handler={onSelectFilter}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const toggleFilter = () => dispatch(toggleShowFilter(!showFilter));

  const toggleView = () => dispatch(toggleChangeView(!isTableView));

  const onSelectLimit = (limit) => {
    setParams({
      ...params,
      limit
    })
  }

  return (
    <Layout>
      <Head>
        <title>Deall | Product</title>
      </Head>
      <Breadcrumbs
        data={[
          {text: 'Product', link:'/'}
      ]}
      />
      <div className={styles.mainTitle}>Products</div>
      {generateToolkit()}
      <div className={styles.productContainer}>
        <div className={`${styles.contentWrapper} ${!showFilter ? styles.fullWidth : '' }`}>
          { isTableView ? generateProductTable() : generateProductCard()}
        </div>
      </div>
    </Layout>
  )
}