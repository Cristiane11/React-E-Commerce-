import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image, rating, description }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, image, count: 1 }));
  };

  return (
    <div className="product-card">
      <img src={image} alt={title} onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>${price.toFixed(2)}</p>
      <p>Rating: {rating.rate} ({rating.count})</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;