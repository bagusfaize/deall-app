import styles from '@/styles/components/Table.module.css'
import { useEffect, useState } from 'react'
import Pagination from './Pagination'
import { AiOutlineFileSearch } from 'react-icons/ai'

export default function Table({ columns, data, limit = 10, total }) {
    const [dataDisplayed, setDataDisplayed] = useState([])
    const [page, setPage] = useState(1);
    const dataNotFound = data.length === 0;

    useEffect(() => {
        setDataDisplayed(paginate(data, page, limit))
    }, [data, limit, page])

    useEffect(() => {
        setPage(1)
    }, [data])

    const paginate = (items, page, perPage) => items.slice(perPage * (page - 1), perPage * page);

    const handlePage = (type) => {
        if (type === 'prev' && page > 1) {
            setPage(page - 1)
        } else if (type === 'next') {
            setPage(page + 1)
        }
    }

    const generateEmptyState = () => {
        return(
            <div className={styles.emptyState}>
               <div>Data Not Found</div>
            </div>
        )
    }

    return (
        <>
            <table className={styles.generalTable}>
                <thead>
                    <tr>
                        {columns.map(item => {
                            if (typeof item === 'object') {
                                return <th key={`th-${item.title}`} width={item.width}>{item.title}</th>
                            } else {
                                return <th key={`th-${item}`}>{item}</th>

                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {dataDisplayed.map(item => {
                    return (
                        <tr key={`tr-${item[0]}`}>
                            {item.map(value => (
                                <td key={`td-${item[0]}`}>{value}</td>
                            ))}
                        </tr>
                    )})
                    }
                </tbody>
            </table>
            {dataNotFound && generateEmptyState()}
            <div className={styles.pagination}>
                <Pagination
                    handlePage={handlePage}
                    page={page}
                    limit={limit}
                    productLength={dataDisplayed.length}
                    totalData={total}
                />
            </div>
        </>
    )
}