import { addToCart } from '@/store/cart.slice';
import styles from '@/styles/components/CardBox.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';
import { BiSearchAlt } from 'react-icons/bi'

export default function CardBox({ data, limit = 10, total }) {
    const [dataDisplayed, setDataDisplayed] = useState([])
    const [page, setPage] = useState(1);
    const dataNotFound = data.length === 0;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)

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
        return (
            <div className={styles.emptyState}>
                <BiSearchAlt/>
                <div>Data Not Found</div>
            </div>
        )
    }

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    }

    return (
        <>
            <div className={styles.cardView}>
                {dataDisplayed.map(item => {
                    const isAdded = cart.find(data => data.id === item.id) ? true : false;
                    return (
                        <div className={styles.cardBox} key={item.title}>
                            <div className={styles.image}><Image src={item.images[0]} width={100} height={100} alt={item.title} /></div>
                            <div className={styles.content}>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.desc}>{item.description}</div>
                                <div className={styles.price}>{`$${item.price}`}</div>
                                <button onClick={() => handleAddToCart(item)} className={styles.addToCart} disabled={isAdded} key='addCart'>
                                    <FiShoppingBag />
                                    <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {dataNotFound && generateEmptyState()}
            {!dataNotFound &&
            <div className={styles.pagination}>
                <Pagination
                    handlePage={handlePage}
                    page={page}
                    limit={limit}
                    productLength={dataDisplayed.length}
                    totalData={total}
                    />
            </div>
            }
        </>
    )
}
