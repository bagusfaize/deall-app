import styles from '@/styles/components/Table.module.css'
import { useSelector } from 'react-redux';

export default function Table({ columns, data }) {
    const generalState = useSelector(state => state.general);
    const isLoading = generalState.isLoading;
    const dataNotFound = data.length === 0;

    const generateEmptyState = () => {
        return(
            <tr>
               <td colSpan={100} className={styles.emptyState}>Data Not Found</td>
            </tr>
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
                    {data.map((item, index) => {
                    return (
                        <tr key={`tr-${index}`}>
                            {item.map((value, index2) => (
                                <td key={`td-${index}-${index2}`}>{value}</td>
                            ))}
                        </tr>
                    )})
                    }
                    {dataNotFound && !isLoading && generateEmptyState()}
                </tbody>
            </table>
        </>
    )
}