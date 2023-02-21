import Head from 'next/head'
import Layout from '@/components/Layout'
import styles from '@/styles/General.module.css'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function Cart() {
  const generateEmptyState = () => {
    return(
      <div className={styles.emptyState}>
        <div className={styles.icon}><AiOutlineInfoCircle/></div>
        <div className={styles.desc}>Coming Soon!</div>
      </div>
    )
  }
  return (
    <Layout>
      <Head>
        <title>Deall | About</title>
      </Head>
      <Breadcrumbs
        data={[
          {text: 'About', link:'/'}
      ]}
      />
      <div className={styles.mainTitle}>About</div>  
      {generateEmptyState()}
    </Layout>
  )
}
