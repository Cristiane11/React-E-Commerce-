import React from "react";

interface CategorySelectProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ categories, selectedCategory, onChange }) => {
  return (
    <select value={selectedCategory} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
};

export default CategorySelect;