"use client";

import useFetchProducts from "@/api/ListProducts";
import { useState, useEffect } from 'react';
import ProductList from "./showListProduct/page";
import useFetchCategories from "@/api/ListCategories";
import useAddProduct from "@/api/AddProduct";

const ProductFetcher = () => {
  const { listProducts, error } = useFetchProducts();
  const [list, setList] = useState([]);
  const { listCategories } = useFetchCategories();
  const { addProduct } = useAddProduct();

  useEffect(() => {
    setList(listProducts);
  }, [listProducts]);

  return (
    <ProductList
      addProduct={addProduct}
      listProducts={list}
      error={error}
      listCategories={listCategories}
      setListProducts={setList}
    />
  );
};

export default ProductFetcher;
