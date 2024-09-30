"use client";
import React, { useState } from 'react';

const SearchProduct = ({ fetchProducts, setListProducts, listCategories }) => {
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    const handleSearch = () => {
        fetchProducts(searchName, searchCategory);
    };

    return (
        <div className="flex mb-4">
            <input
                type="text"
                placeholder="Tìm theo tên sản phẩm"
                className="border border-gray-300 p-2 w-full mr-2"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <select
                className="border border-gray-300 p-2"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
            >
                <option value="">Tất cả thể loại</option>
                {listCategories && listCategories.map(category => (
                    <option key={category.id} value={category.categoryName}>
                        {category.categoryName}
                    </option>
                ))}
            </select>
            <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={handleSearch}
            >
                Tìm kiếm
            </button>
        </div>
    );
};

export default SearchProduct;
