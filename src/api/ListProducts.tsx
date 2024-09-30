"use client";

import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchProducts = () => {
    const [listProducts, setListProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3005/products');
                const sortedProducts = res.data.sort((a, b) => a.productName.localeCompare(b.productName));
                setListProducts(sortedProducts);
            } catch (error) {
                setError(error);
            }
        };

        fetchProducts();
    }, []);

    return { listProducts, error };
}

export default useFetchProducts;
