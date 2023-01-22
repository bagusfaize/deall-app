import axios from "axios"
import { BiGridAlt, BiSearchAlt } from 'react-icons/bi';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { MdClear } from 'react-icons/md';
import { useState } from "react";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setProducts, toggleChangeView, toggleShowFilter, updateFilter } from "@/store/product.slice";
import { addToCart } from "@/store/cart.slice";
import Filter from "@/components/Filter"
import Layout from "@/components/Layout"
import styles from '@/styles/General.module.css'
import Table from "@/components/Table";
import Head from "next/head";
import { cleanObject } from "@/utils/cleanObject";
import { BiTable } from 'react-icons/bi'
import CardBox from "@/components/CardBox";

export default function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.product.products);
  const filteredProduct = useSelector(state => state.product.filteredProduct);
  const filter = useSelector(state => state.product.filter);
  const totalProduct = useSelector(state => state.product.total);
  const showFilter = useSelector(state => state.product.showFilter);
  const cart = useSelector(state => state.cart.cart)
  const isTableView = useSelector(state => state.product.isTableView);
  const displayedData = !isEmpty(filter) ? filteredProduct : allProducts;

  console.log('clg cart', cart);
  
  const [searchInput, setSearchInput] = useState('')
  
  useEffect(() => {
    const getAllProduct = () => {
      const params = {limit: 100};
      const apiUrl ='https://dummyjson.com/products'
        axios
        .get(apiUrl, {params})
        .then((response) => {
          dispatch(setProducts(response.data))
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    const getCategory = () => {
      const apiUrl ='https://dummyjson.com/products/categories'
        axios
        .get(apiUrl)
        .then((response) => {
          dispatch(setCategories(response.data))
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    getAllProduct()
    getCategory()
  }, [])

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  }

  const generateProductTable = () => {
    const columns = [{width:'30%', title:'Product Name'}, {width:'20%', title:'Brand'}, 'Price', 'Stock', 'Category', 'Action'];
    
    const data = displayedData.map(item => {
      const isAdded = cart.find(data => data.id === item.id) ? true : false;
      const addToCartBtn = <button onClick={()=>handleAddToCart(item)} disabled={isAdded} className={styles.addToCart} key='addCart'>{isAdded ? 'Added' : 'Add'}</button>;
      return [
        item.title,
        item.brand,
        `$${item.price}`,
        item.stock,
        item.category,
        addToCartBtn
    ];
    }) || [];
    return (
      <>
        <Table
          data={data}
          columns={columns}
          total={totalProduct}
          limit={5}
        />
      </>
    );
  }

  const generateCardView = () => {
    return(
      <CardBox 
        data={displayedData}
        total={totalProduct}
        />
    )
  }

  const handleClearSearch = () => {
    setSearchInput('');
    let params = {...filter};
    delete params['title']
    dispatch(updateFilter(params))
  }

  const handleSearchProduct = () => {
    let params = {...filter};
    if (isEmpty(searchInput)) {
      delete params['title']
    } else {
      params['title'] = [searchInput]
    }
    cleanObject(params);
    dispatch(updateFilter(params))
  }

  const toggleFilter = () => dispatch(toggleShowFilter(!showFilter));

  const toggleView = () => dispatch(toggleChangeView(!isTableView));

  return (
    <Layout>
      <Head>
        <title>Deall | Product</title>
      </Head>
      <div className={styles.mainTitle}>All Products</div>
      <div className={styles.toolkit}>
        <div className={styles.displayFlex}>
          <div onClick={toggleFilter} className={` ${styles.filterToggle} ${showFilter ? styles.filterActive : ''}`}>
            <HiAdjustmentsHorizontal/>Filter
          </div>
          <div className={styles.toggleProductView}>
            <div className={styles.toggle}>
              <input type='radio' id='cardView' name="productToggle" checked={!isTableView}/>
              <label onClick={toggleView} htmlFor='cardView' className={styles.first}><BiGridAlt/></label>
            </div>
            <div className={styles.toggle}>
              <input type='radio' id='tableView' name="productToggle" checked={isTableView}/>
              <label onClick={toggleView} htmlFor='tableView' className={styles.last}><BiTable/></label>
            </div>
          </div>
        </div>
        <div className={styles.searchBar}>
          <input 
            value={searchInput}
            className={styles.input}
            type='text'
            placeholder='Search by product name'
            onChange={(e) => setSearchInput(e.target.value)}
            />
          {searchInput && <div onClick={handleClearSearch} className={styles.clearSearch}><MdClear/></div>}
          <button onClick={handleSearchProduct}>
            <BiSearchAlt />
          </button>
        </div>
      </div>
      <div className={styles.displayFlex}>
        {showFilter &&
          <div className={styles.filterFlex}>
            <Filter />
          </div>
        }
        <div className={styles.productFlex}>
          { isTableView ? generateProductTable() : generateCardView()}
        </div>
      </div>
    </Layout>
  )
}