import { useDispatch, useSelector } from 'react-redux';
import { resetFilter, updateFilter } from '@/store/product.slice';
import { cleanObject } from '@/utils/cleanObject';
import styles from '@/styles/components/Filter.module.css'
import FilterOptions from './FilterOptions';

export default function Filter() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products)
    const filter = useSelector(state => state.product.filter);
    const categories = useSelector(state => state.product.categories)
    const brand = [... new Set(products.map(item => item.brand))];

    const filterOptions = [
        {name: 'category', data: categories},
        {name: 'brand', data: brand}
    ]

    const onSelectFilter = (key,value) => {
        let params = {...filter};
        // console.log('clg params', params);
        if (key in params) {
            // console.log('clg params 1', params, key);
            const valueIsExist = params[key].includes(value);
            if (valueIsExist) {
                // console.log('clg params 2', params[key]);
                params[key] = params[key].filter(item => item !== value)
            } else {
                // console.log('clg params 3', params[key]);
                params[key] = [...params[key],value]
            }
        } else {
            params[key] = [value]
            // params = {...{[key]:[value]}}
            // console.log('clg params 4', params);
        }
        // setFilter(params)
        cleanObject(params);
        dispatch(updateFilter(params))
    };

    const onResetFilter = () => {
        dispatch(resetFilter())
    }

    return (
        <div className={styles.filterBox}>
            {filterOptions.map((item, index) =>(
                <FilterOptions
                    filter={filter}
                    name={item.name} 
                    data={item.data} 
                    onSelectFilter={onSelectFilter}
                    onResetFilter={onResetFilter}
                    key={item.name} 
                    idx={index} />
            ))}
        </div>
    )
}
