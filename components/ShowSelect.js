import { useState } from 'react';
import styles from '@/styles/components/ShowSelect.module.css';
import { BiChevronDown } from 'react-icons/bi';


export default function ShowSelect({limit, options, handler}){
    const [isOpen, setIsOpen] = useState(false);

    const onClickSelect = () => {
        setIsOpen(!isOpen);
    }

    const onClickOptions = (limit) => {
        setIsOpen(false);
        handler(limit);
    }

    return (
        <div className={styles.show}>
            <span>Show</span>
            <span className={styles.handler} onClick={onClickSelect}>{limit}<BiChevronDown/></span>
            { isOpen &&
                <div className={styles.select}>
                    {options.map(item => <div key={item} onClick={() => onClickOptions(item)} className={styles.options}>{item}</div> )}
                </div>
            }
        </div>
    )
}