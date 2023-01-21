import { useDispatch, useSelector } from 'react-redux';
import Layout from '@/components/Layout'
import styles from '@/styles/General.module.css'
import Table from '@/components/Table';
import { SlSocialDropbox } from 'react-icons/sl';
import { TbDiscount2 } from 'react-icons/tb';
import Head from 'next/head';
import { removeFromCart } from '@/store/cart.slice';
import { RiDeleteBinLine } from 'react-icons/ri'

export default function Cart() {
  const cartState = useSelector(state => state.cart);
  const cart = cartState.cart;
  const totalPrice = cartState.totalPrice;
  const totalQty = cartState.totalQty;
  const isCartEmpty = cart.length === 0;
  const dispatch = useDispatch()


  const generateEmptyState = () => {
    return(
      <div className={styles.emptyState}>
        <div className={styles.icon}><SlSocialDropbox/></div>
        <div className={styles.desc}>Your cart is empty</div>
      </div>
    )
  }

  const generateContent = () => {
    return (
      <div className={styles.cartSection}>
        <div className={styles.cartFlex}>{generateTable()}</div>
        <div className={styles.summaryFlex}>{generateSummary()}</div>
      </div>
    );
  }

  const generateSummary = () => {
    return(
      <div className={styles.summary}>
        <div className={styles.header}>Summary</div>
        <div className={styles.body}>
          <div className={styles.item}>
            <span>Total items</span>
            <span>{totalQty}</span>
          </div>
          <div className={styles.item}>
            <span>Subtotal</span>
            <span>{`$${totalPrice}`}</span>
          </div>
          <div className={styles.item}>
            <span>Service</span>
            <span className={styles.free}>Free</span>
          </div>
          <div className={styles.item}>
            <span>Delivery</span>
            <span className={styles.free}>Free</span>
          </div>
          <div className={styles.grandTotal}>
            <span>Total</span>
            <span>{`$${totalPrice}`}</span>
          </div>
          <div className={styles.promo}>
            <TbDiscount2/>
            <p>Free shipping and service fee with <b>BayarAja</b> payment method.</p>
          </div>
        </div>
      </div>
    )
  }

  const onRemoveFromCart = (item) => {
    dispatch(removeFromCart(item))
  }

  const generateTable = () => {
    const columns = [{width:'30%', title:'Product Name'}, {width:'20%', title:'Brand'}, 'Price', 'Category', 'Quantity',] 
    const data = cart.map(item => {
      const removeBtn = <button onClick={()=>onRemoveFromCart(item)} className={styles.removeFromCart} key='addCart'><RiDeleteBinLine/></button>
      return [
        item.title,
        item.brand,
        `$${item.price}`,
        item.category,
        item.quantity,
        removeBtn
    ];
    }) || [];
    return (
      <>
        <Table
          data={data}
          columns={columns}
          total={cart.length}
          limit={5}
        />
      </>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Deall | Cart</title>
      </Head>
      <div className={styles.mainTitle}>My Cart</div>  
      {isCartEmpty ? generateEmptyState() : generateContent()}
    </Layout>
  )
}
