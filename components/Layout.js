import styles from '@/styles/components/Layout.module.css'
import { useSelector } from 'react-redux';
import Navigation from './Navigation';

export default function Layout(props) {
  const generalState = useSelector(state => state.general);
  const isLoading = generalState.isLoading;
  const { children } = props;
  return (
    <div className={styles.main}>
        <Navigation />
        <div className={styles.contentContainer}>
          {children}
          {isLoading &&
            <div className={styles.loading}><div className={`${styles.loader} ${styles.center}`}><span></span></div></div>
          }
        </div>
    </div>
  )
}