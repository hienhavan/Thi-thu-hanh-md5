"use client";

import axios from 'axios';
import { useState } from 'react';


const useAddProduct = () => {

    const [error, setError] = useState(null);

    const addProduct = async (newProduct) => {
        try {
            await axios.post('http://localhost:3005/products', newProduct);
            const res = await axios.get('http://localhost:3005/products');
            return { updatedProduct: res.data, error: null };
        } catch (error) {
            setError(error);
            return { updatedProduct: null, error };
        }
    };

    return { addProduct: addProduct, error };
};

export default useAddProduct;
