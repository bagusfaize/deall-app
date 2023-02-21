import styles from '@/styles/components/Breadcrumbs.module.css'
import { FiHome, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

export default function Breadcrumbs({data = []}) {
    return (
        <div className={styles.breadcrumbsWrapper}>
            <div><FiHome /></div>
            {data.map(item => {
                return (
                    <div className={styles.item} key={`bread-${item.text}`}>
                        <FiChevronRight className={styles.separator}/>
                        {item.link ?
                        <Link href={item.link}>
                            <div className={styles.label}>{item.text}</div>
                        </Link>
                        :
                        <div className={styles.label}>{item.text}</div>
                        }
                    </div>
                )
            })}
        </div>
    )
}