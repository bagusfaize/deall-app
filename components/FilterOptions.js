import React, { useState } from 'react'
import styles from '@/styles/components/FilterOptions.module.css'
import { HiPlus, HiMinus } from 'react-icons/hi'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { isEmpty } from 'lodash';

export default function FilterOptions({name, data = [], onSelectFilter, filter}) {
    const [expanded, setExpanded] = useState(true)
    const [showAll, setShowAll] = useState(false);
    const options = showAll ? data : data.slice(0,4);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    }

    // console.log('clg filter', filter);

    
    return (
        <>
            <div className={styles.header} onClick={()=> setExpanded(!expanded)}>
                <span className={styles.title}>{name}</span>
                <span className={styles.expand}>{expanded ? <BiChevronUp/> : <BiChevronDown/> }</span>
            </div>
            {expanded && 
                <div className={styles.content}>
                    {options.map(item => {
                        const isExist = !isEmpty(filter) && filter[name];
                        const checked = !isEmpty(isExist) && isExist.includes(item)
                        // console.log('clg checked', checked);
                        return (
                            <div className={styles.filterCheckbox} key={item}>
                                <input type='checkbox' id={`filter-${item}`} defaultChecked={checked}/>
                                <label
                                    onClick={() => onSelectFilter(name, item)}
                                    htmlFor={`filter-${item}`}>
                                    {item}
                                </label>
                            </div>
                    )})}
                    <div className={styles.showMore}>
                        <button onClick={toggleShowAll}>
                            {showAll ?  <HiMinus/> : <HiPlus/>}
                            {showAll ? 'Show less' : 'Show more' }
                        </button>
                    </div>
                </div>
            }
        </>
    )
}
