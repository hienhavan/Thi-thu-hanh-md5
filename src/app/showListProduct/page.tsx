"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SearchProduct from '@/api/SearchProduct';
import useAddProduct from '@/api/AddProduct';

const ProductList = ({ addProduct, listProducts, error, listCategories, setListProducts }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [checker, setChecker] = useState(false);
    const { addProduct: addNewProduct, error: addError } = useAddProduct();

    const fetchProducts = async (searchName = "", searchCategory = "") => {
        try {
            const nameQuery = searchName ? `productName_like=${searchName}` : '';
            const categoryQuery = searchCategory ? `category=${searchCategory}` : '';
            const query = [nameQuery, categoryQuery].filter(Boolean).join('&');
            const response = await fetch(`http://localhost:3005/products?${query}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            setListProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const { updatedProduct, error } = await addNewProduct(data);
            if (error) throw error;

            alert("Thêm mới thành công");
            setChecker(false);
            setListProducts(updatedProduct);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const toggleEditForm = () => {
        setChecker(!checker);
    };

    const validateDate = (value) => {
        const selectedDate = new Date(value);
        const currentDate = new Date();
        return selectedDate <= currentDate || "Ngày nhập không được lớn hơn ngày hiện tại";
    };

    return (
        <div className="container mx-auto p-4">
            <SearchProduct fetchProducts={fetchProducts} setListProducts={setListProducts} listCategories={listCategories} />
            <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
            {error && <p className="text-red-500">{error.message}</p>}

            <table className="min-w-full bg-white border border-gray-300 mb-4">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="py-2 px-4 border-b">STT</th>
                        <th className="py-2 px-4 border-b">Mã Sản Phẩm</th>
                        <th className="py-2 px-4 border-b">Tên Sản Phẩm</th>
                        <th className="py-2 px-4 border-b">Mô Tả</th>
                        <th className="py-2 px-4 border-b">Thể Loại</th>
                        <th className="py-2 px-4 border-b">Giá</th>
                        <th className="py-2 px-4 border-b">Số Lượng</th>
                        <th className="py-2 px-4 border-b">Ngày Nhập</th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts.length > 0 ? (
                        listProducts.map((item, index) => (
                            <tr className="hover:bg-gray-100" key={item.productCode}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{item.productCode}</td>
                                <td className="py-2 px-4 border-b">{item.productName}</td>
                                <td className="py-2 px-4 border-b">{item.description}</td>
                                <td className="py-2 px-4 border-b">{item.category}</td>
                                <td className="py-2 px-4 border-b">{item.price.toLocaleString()} VNĐ</td>
                                <td className="py-2 px-4 border-b">{item.quantity}</td>
                                <td className="py-2 px-4 border-b">{item.dateAdded}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="py-2 px-4 border-b" colSpan="7">Không có sản phẩm nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mb-4"
                onClick={toggleEditForm}
            >
                Thêm Sản Phẩm
            </button>

            {checker && (
                <form className="bg-white p-4 border border-gray-300 rounded" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4">
                        <label>
                            Mã Sản Phẩm:
                            <input
                                type="text"
                                className="border border-gray-300 p-2 w-full"
                                {...register("productCode", {
                                    required: "Mã sản phẩm là bắt buộc",
                                    pattern: {
                                        value: /^PROD-[\d]+$/,
                                        message: "Mã sản phẩm phải theo định dạng PROD-XXX"
                                    }
                                })}
                            />
                            {errors.productCode && <p className="text-red-500">{errors.productCode.message}</p>}
                        </label>

                        <label>
                            Tên Sản Phẩm:
                            <input
                                type="text"
                                className="border border-gray-300 p-2 w-full"
                                {...register("productName", { maxLength: 100, required: "Tên sản phẩm là bắt buộc" })}
                            />
                            {errors.productName && <p className="text-red-500">{errors.productName.message}</p>}
                        </label>

                        <label>
                            Mô Tả:
                            <textarea
                                className="border border-gray-300 p-2 w-full"
                                {...register("description", { required: "Mô tả là bắt buộc", maxLength: 500 })}
                            />
                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        </label>

                        <label>
                            Thể Loại:
                            <select
                                className="border border-gray-300 p-2 w-full"
                                {...register("category", { required: "Thể loại là bắt buộc" })}
                            >
                                <option value="">Chọn thể loại</option>
                                {listCategories && listCategories.length > 0 ? (
                                    listCategories.map(item => (
                                        <option key={item.categoryId} value={item.categoryName}>
                                            {item.categoryName}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Không có thể loại nào.</option>
                                )}
                            </select>
                            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                        </label>

                        <label>
                            Giá:
                            <input
                                type="number"
                                className="border border-gray-300 p-2 w-full"
                                {...register("price", { required: "Giá là bắt buộc", min: { value: 0, message: "Giá phải lớn hơn hoặc bằng 0" } })}
                            />
                            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                        </label>

                        <label>
                            Số Lượng:
                            <input
                                type="number"
                                className="border border-gray-300 p-2 w-full"
                                {...register("quantity", { required: "Số lượng là bắt buộc" })}
                            />
                            {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
                        </label>

                        <label>
                            Ngày Nhập:
                            <input
                                type="date"
                                className="border border-gray-300 p-2 w-full"
                                {...register("dateAdded", { required: "Ngày nhập là bắt buộc", validate: validateDate })}
                            />
                            {errors.dateAdded && <p className="text-red-500">{errors.dateAdded.message}</p>}
                        </label>
                    </div>

                    <div className="flex justify-center items-center mt-4">
                        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200" type="submit">Gửi</button>
                        <button
                            className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-200 ml-2"
                            type="button"
                            onClick={toggleEditForm}
                        >
                            Hủy
                        </button>
                    </div>                       </form>
            )}
        </div>
    );
};

export default ProductList;
