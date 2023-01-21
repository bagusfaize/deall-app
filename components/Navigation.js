import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/components/Navigation.module.css';
import { MdOutlineListAlt, MdOutlineAccountCircle } from 'react-icons/md';
import { FiShoppingBag } from 'react-icons/fi';
import { useSelector } from 'react-redux';

export default function Navigation() {
    const cart = useSelector(state => state.cart);
    const router = useRouter();
    const pathname = router.pathname;
    const isCartEmpty = cart.totalQty === 0;

    return (
        <div className={styles.navigation}>
            <div className={styles.brand}>
                <span className={styles.logo}>D</span>
                <span>DeallCommurz</span>
            </div>
            <ul className={styles.menu}>
                <Link href="/">
                    <li className={pathname === '/' ? styles.isActive : null}>
                        <span className={styles.icon}><MdOutlineListAlt/></span>
                        <span className={styles.title}>Product</span>
                     </li>
                </Link>
                <Link href="/cart">
                    <li className={pathname === '/cart' ? styles.isActive : null}>
                        <span className={styles.icon}><FiShoppingBag/></span>
                        <span className={styles.title}>Cart</span>
                        { !isCartEmpty && <span className={styles.counter}>{cart.totalQty}</span> }
                    </li>
                </Link>
                <Link href="/account">
                    <li className={pathname === '/account' ? styles.isActive : null}>
                        <span className={styles.icon}><MdOutlineAccountCircle/></span>
                        <span className={styles.title}>Account</span>
                    </li>
                </Link>
            </ul>
        </div>
    )
}
