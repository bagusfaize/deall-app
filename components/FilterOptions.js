import React, { useState } from 'react'
import styles from '@/styles/components/FilterOptions.module.css'
import { HiPlus, HiMinus } from 'react-icons/hi'

export default function FilterOptions({data = [], onSelectFilter}) {
    const [showAll, setShowAll] = useState(false);
    const options = showAll ? data : data.slice(0,15);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    }
    
    return (
        <>
            <div className={styles.header} onClick={()=> setExpanded(!expanded)}>
                <span className={styles.title}>Category</span>
            </div>
            <div className={styles.content}>
                {options.map(item => {
                    return (
                        <div className={styles.filterCheckbox} key={item}>
                            <label
                                onClick={() => onSelectFilter(item)}
                                htmlFor={`filter-${item}`}>
                                {item}
                            </label>
                        </div>
                )})}
                <div className={styles.showMore}>
                    <button onClick={toggleShowAll}>
                        {showAll ?  
                        <span><HiMinus/> Show less</span>
                        : 
                        <span><HiPlus/> Show more</span>
                        }
                    </button>
                </div>
            </div>
        </>
    )
}
