import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '@/store/product.slice';
import FilterOptions from './FilterOptions';

export default function Filter({handler}) {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.product.categories);

    const onSelectFilter = (selected) => {
        handler(selected);
    };

    const onResetFilter = () => {
        dispatch(resetFilter())
    }

    return (
        <FilterOptions
            data={categories}
            onSelectFilter={onSelectFilter}
            onResetFilter={onResetFilter}
        />
    )
}
