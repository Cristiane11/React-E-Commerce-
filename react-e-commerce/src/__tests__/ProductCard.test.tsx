import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../features/cartSlice";
import mockStore from "../__tests__/__mock__/mockStore";

jest.mock("../features/cartSlice", () => ({
  addToCart: jest.fn(() => ({ type: "cart/addToCart" })),
}));

const mockStore = configureStore([]);

describe("ProductCard Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 29.99,
    category: "electronics",
    description: "Great product for testing.",
    image: "https://via.placeholder.com/150",
    rating: { rate: 4.5, count: 20 },
  };

  it("renders product details correctly", () => {
    render(
      <Provider store={store}>
        <ProductCard {...mockProduct} />
      </Provider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Great product for testing.")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("dispatches addToCart when clicking 'Add to Cart'", () => {
    render(
      <Provider store={store}>
        <ProductCard {...mockProduct} />
      </Provider>
    );

    const addButton = screen.getByText("Add to Cart");
    fireEvent.click(addButton);

    expect(store.dispatch).toHaveBeenCalled();
    expect(addToCart).toHaveBeenCalledWith({
      id: 1,
      title: "Test Product",
      price: 29.99,
      image: "https://via.placeholder.com/150",
      count: 1,
    });
  });
});
