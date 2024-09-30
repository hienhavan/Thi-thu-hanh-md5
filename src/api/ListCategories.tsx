"use client";

import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchCategories = () => {
    const [listCategories, setListCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3005/categories');
                setListCategories(res.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchCategories();
    }, []);

    return { listCategories, error };
};

export default useFetchCategories; 
