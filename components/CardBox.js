import styles from '@/styles/components/CardBox.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiSearchAlt } from 'react-icons/bi'

export default function CardBox({ data }) {
    const dataNotFound = data.length === 0;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)

    const generateEmptyState = () => {
        return (
            <div className={styles.emptyState}>
                <BiSearchAlt/>
                <div>Data Not Found</div>
            </div>
        )
    }

    return (
        <>
            <div className={styles.cardView}>
                {data.map(item => {
                    return (
                        <div className={styles.cardBox} key={item.title}>
                            <div className={styles.image}><Image src={item.images[0]} width={100} height={100} alt={item.title} /></div>
                            <div className={styles.content}>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.desc}>{item.description}</div>
                                <div className={styles.price}>{`$${item.price}`}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {dataNotFound && generateEmptyState()}
        </>
    )
}
