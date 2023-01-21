import styles from '@/styles/components/Pagination.module.css'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

export default function Pagination ({page, handlePage, totalData, productLength, limit}){
    const totalPage = Math.ceil(totalData/limit);
    const disablePrev = page === 1;
    const disableNext = productLength === totalData || page === totalPage;
    return (
        <div className={styles.pageWrapper}>
            <button onClick={() => handlePage('prev')} className={styles.prev} disabled={disablePrev}><GrFormPrevious/></button>
            <span className={styles.page}>{`${page} / ${totalPage}`}</span>
            <button onClick={() => handlePage('next')} className={styles.next} disabled={disableNext}><GrFormNext/></button>
        </div>
    )
}