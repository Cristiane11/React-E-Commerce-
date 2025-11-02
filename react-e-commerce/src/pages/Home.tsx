import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories, getProductsByCategory } from "../api/api";
import ProductList from "../components/ProductList";
import CategorySelect from "../components/CategorySelect";

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Fetch products (depends on selected category)
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory ? getProductsByCategory(selectedCategory) : getProducts(),
  });

  if (isLoadingCategories || isLoadingProducts) {
    return <p>Loading products...</p>;
  }

  if (isErrorCategories || isErrorProducts) {
    return <p>Failed to load data. Please try again later.</p>;
  }

  return (
    <div>
      <h1>Fake Store</h1>

      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

      <ProductList products={products} />
    </div>
  );
};

export default Home;