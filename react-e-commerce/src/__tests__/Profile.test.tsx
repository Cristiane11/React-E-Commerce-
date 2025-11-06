import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Profile from "../components/Profile";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../firebase/userService";

jest.mock("../firebase/userService");

beforeAll(() => {
  window.alert = jest.fn(); // Prevent jsdom alert crash
});

// ✅ helper to create an in-memory Redux store
const createTestStore = (preloadedState: any) =>
  configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
    },
    preloadedState,
  });

describe("Profile Component", () => {
  it("renders profile and allows updating", async () => {
    (getUserProfile as jest.Mock).mockResolvedValue({
      name: "John",
      address: "123 Street",
    });

    const store = createTestStore({
      user: { user: { uid: "123", email: "test@example.com" } },
      cart: { items: [] },
    });

    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    expect(await screen.findByDisplayValue("John")).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText("Name");
    fireEvent.change(nameInput, { target: { value: "Jane" } });

    const saveButton = screen.getByText("Save Changes");
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(updateUserProfile).toHaveBeenCalledWith("123", {
        name: "Jane",
        address: "123 Street",
      })
    );
  });

  it("calls deleteUserProfile when clicking delete", async () => {
    (getUserProfile as jest.Mock).mockResolvedValue({
      name: "John",
      address: "123 Street",
    });

    const store = createTestStore({
      user: { user: { uid: "123", email: "test@example.com" } },
      cart: { items: [] },
    });

    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    const deleteButton = await screen.findByText("Delete Account");
    fireEvent.click(deleteButton);

    await waitFor(() =>
      expect(deleteUserProfile).toHaveBeenCalledWith("123")
    );
  });

  it("shows login message when no user is found", () => {
    const store = createTestStore({
      user: { user: null }, // ✅ match real store shape
      cart: { items: [] },
    });

    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    expect(
      screen.getByText("Please log in to view your profile.")
    ).toBeInTheDocument();
  });
});
