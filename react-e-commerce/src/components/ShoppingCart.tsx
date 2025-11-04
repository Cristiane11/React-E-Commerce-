// src/components/ShoppingCart.tsx
import { createOrder } from "../firebase/orderService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { clearCart } from "../features/cartSlice";

const ShoppingCart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  // RootState currently doesn't include a 'user' slice; use a relaxed selector type here
  const user = useSelector((state: any) => state?.user?.user);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to checkout.");
      return;
    }
    try {
      await createOrder(user.uid, items);
      dispatch(clearCart());
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed.");
    }
  };

  return (
    <div>
      {/* ...cart UI... */}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default ShoppingCart;
