import styles from '@/styles/components/Layout.module.css'
import Navigation from './Navigation';

export default function Layout(props) {
    const { children } = props;
  return (
    <div className={styles.main}>
        <Navigation />
        <div className={styles.container}>
          {children}
        </div>
    </div>
  )
}