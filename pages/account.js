import Head from 'next/head'
import Layout from '@/components/Layout'
import styles from '@/styles/General.module.css'
import {GiGears} from 'react-icons/gi'

export default function Cart() {
  const generateEmptyState = () => {
    return(
      <div className={styles.emptyState}>
        <div className={styles.icon}><GiGears/></div>
        <div className={styles.desc}>Coming Soon!</div>
      </div>
    )
  }
  return (
    <Layout>
      <Head>
        <title>Deall | Accunt</title>
      </Head>
      <div className={styles.mainTitle}>Account</div>  
      {generateEmptyState()}
    </Layout>
  )
}
