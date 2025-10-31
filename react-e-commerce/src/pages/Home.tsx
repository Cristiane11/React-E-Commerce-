import React, { useState } from "react";
import { useQuery } from "react-query";
import { getProducts, getCategories, getProductsByCategory } from "../api/api";
import ProductList from "../components/ProductList";
import CategorySelect from "../components/CategorySelect";

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: categories = [] } = useQuery("categories", getCategories);
  const { data: products = [] } = useQuery(
    ["products", selectedCategory],
    () => selectedCategory ? getProductsByCategory(selectedCategory) : getProducts()
  );

  return (
    <div>
      <h1>Fake Store</h1>
      <CategorySelect categories={categories} selectedCategory={selectedCategory} onChange={setSelectedCategory} />
      <ProductList products={products} />
    </div>
  );
};

export default Home;