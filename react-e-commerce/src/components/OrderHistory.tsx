import React, { useEffect, useState } from "react";
import { getUserOrders } from "../firebase/orderService";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const OrderHistory: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getUserOrders(user.uid).then(setOrders);
    }
  }, [user]);

  if (!user) return <p>Please login to see order history.</p>;

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
