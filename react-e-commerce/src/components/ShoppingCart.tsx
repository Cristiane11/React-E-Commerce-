import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { removeFromCart, clearCart } from "../features/cartSlice";

const ShoppingCart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((sum, item) => sum + (item.price ?? 0) * item.count, 0);

  const handleCheckout = () => {
    dispatch(clearCart());
    alert("Checkout successful!");
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? <p>Your cart is empty.</p> :
        <>
          <ul>
            {items.map(item => (
            <li key={item.id}>
                {item.title} x {item.count} - ${item.price.toFixed(2)}
                <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </li>
            ))}
          </ul>
          <p>Total Items: {items.reduce((sum, i) => sum + i.count, 0)}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      }
    </div>
  );
};

export default ShoppingCart;