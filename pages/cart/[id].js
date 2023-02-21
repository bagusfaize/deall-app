import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout'
import styles from '@/styles/General.module.css'
import Table from '@/components/Table';
import Head from 'next/head';
import { getCartDetailsDispatcher } from '../api';
import Pagination from '@/components/Pagination';
import Breadcrumbs from '@/components/Breadcrumbs';
import { setIsLoading } from '@/store/general.slice';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function Cart() {
  const dispatch = useDispatch();
  const router = useRouter()
  const cartState = useSelector(state => state.cart);
  const total = cartState.total;
  const cartId = Number(router.query.id);
  const [cartDetails, setCartDetails] = useState({})
  const [page, setPage] = useState(cartId)

  useEffect(() => {
    getCartDetails();
  },[cartId])

  useEffect(() => {
    router.push(`/cart/${page}`);
  }, [page])
  
  
  const getCartDetails = () => {
    dispatch(setIsLoading(true));
    getCartDetailsDispatcher(cartId)
    .then(res => {
      const {data} = res;
      setCartDetails(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => dispatch(setIsLoading(false)));
  }

  const generateSummary = () => {
    const {userId, total, totalProducts, totalQuantity} = cartDetails;
    const orderSummary = [
      {label: 'User', value: userId && `User ${userId}` || ''},
      {label: 'Total Products', value: totalProducts},
      {label: 'Total Quantity', value: totalQuantity},
      {label: 'Total Price', value: total && `$${total}` || ''},
    ]
    return(
      <>
        <div className={styles.subTitle}>Summary</div>
        <div className={styles.summary}>
          <div className={styles.detail}>
            {orderSummary.map(item => {
              return (
                <div className={styles.item} key={item.label}>
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </>
    )
  }

  const handlePage = (type) => {
    if (type === 'prev' && page > 1) {
      setPage(page - 1)
    } else if (type === 'next') {
      setPage(page + 1)
    }
  }

  const generateTable = () => {
    const {products = [], totalProducts} = cartDetails;
    const columns = [{width:'50%', title:'Product'},{width:'10%', title:'Price'}, {width:'10%', title:'Qty'}, {width:'20%', title:'Total Price'}];
    const data = products.map(item => {
      return [
        item.title,
        `$${item.price}`,
        item.quantity,
        `$${item.total}`
    ];
    }) || [];
    return (
      <div>
        <div className={styles.subTitle}>Products</div>
        <Table
          data={data}
          columns={columns}
          total={totalProducts}
        />
        <Pagination
          handlePage={handlePage}
          page={page}
          limit={1}
          totalData={total}
        />
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Deall | Cart</title>
      </Head>
      <Breadcrumbs
        data={[
          {text: 'Order', link:'/cart'},
          {text: `Order Details ${cartId}`, link:''}
      ]}
      />
      <div className={styles.mainTitle}>
        <div className={styles.back}>
          <Link href='/cart'><FiChevronLeft /></Link>
        </div>
        {`Order Details #${cartId}`}
      </div>  
      <div className={styles.contentWrapper}>
        <div>{generateSummary()}</div>
        <div>{generateTable()}</div>
      </div>
    </Layout>
  )
}
