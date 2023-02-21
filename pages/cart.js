import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/Layout'
import styles from '@/styles/General.module.css'
import Table from '@/components/Table';
import Head from 'next/head';
import { setCarts } from '@/store/cart.slice';
import { BiRightArrowAlt } from 'react-icons/bi'
import { getCartsDispatcher } from './api';
import ShowSelect from '@/components/ShowSelect';
import Pagination from '@/components/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs';
import { setIsLoading } from '@/store/general.slice';

export default function Cart() {
  const dispatch = useDispatch()
  const router = useRouter();
  const cartState = useSelector(state => state.cart);
  const carts = cartState.carts;
  const total = cartState.total;
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCarts();
  },[limit, skip])
  
  const getCarts = () => {
    dispatch(setIsLoading(true));
    const params = {
      limit,
      skip,
    };
    getCartsDispatcher(params)
    .then(res => {
      const {data} = res;
      dispatch(setCarts(data))
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => dispatch(setIsLoading(false)));
  }

  const generateContent = () => {
    return (
      <div>
        <div>{generateTable()}</div>
      </div>
    );
  }

  const onClickDetail = (id) => {
    router.push(`/cart/${id}`);
  }

  const handlePage = (type) => {
    if (type === 'prev' && page > 1) {
      setPage(page - 1)
      if(page => 1) setSkip(skip-limit)
    } else if (type === 'next') {
      setPage(page + 1)
      setSkip(skip+limit)
    }
  }

  const generateTable = () => {
    const columns = [{width:'30%', title:'User ID'}, 'Total Products','Total Quantity', 'Total Amount', {width:'10%', title:''}] 
    const data = carts.map(item => {
      const detailBtn = <button onClick={()=>onClickDetail(item.id)} className={styles.detailCartBtn} key='details'><span>Details</span><BiRightArrowAlt/></button>
      return [
        item.userId,
        item.totalProducts,
        item.totalQuantity,
        `$${item.total}`,
        detailBtn
    ];
    }) || [];
    return (
      <div>
        <Table
          data={data}
          columns={columns}
          total={carts.length}
          limit={limit}
        />
        <Pagination
          handlePage={handlePage}
          page={page}
          limit={limit}
          totalData={total}
        />
      </div>
    );
  }
  
  const generateToolkit = () => {
    return (
      <div className={`${styles.toolkit} ${styles.flexEnd}`}>
        <ShowSelect
              limit={limit}
              options={[5, 10, 15, 20]}
              handler={onSelectLimit}
            />
      </div>
    );
  }

  const onSelectLimit = (limit) => setLimit(limit);

  return (
    <Layout>
      <Head>
        <title>Deall | Cart</title>
      </Head>
      <Breadcrumbs
        data={[
          {text: 'Order', link:'/cart'}
      ]}
      />
      <div className={styles.mainTitle}>Order Cart ({total})</div>  
      {generateToolkit()}
      {generateContent()}
    </Layout>
  )
}
