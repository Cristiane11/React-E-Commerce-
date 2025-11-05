import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Profile from "../components/Profile";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../firebase/userService";

jest.mock("../firebase/userService");

const mockStore = configureStore([]);

describe("Profile Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      user: { uid: "123", email: "test@example.com" },
    });
  });

  it("renders profile and allows updating", async () => {
    (getUserProfile as jest.Mock).mockResolvedValue({ name: "John", address: "123 Street" });

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

    await waitFor(() => expect(updateUserProfile).toHaveBeenCalledWith("123", { name: "Jane", address: "123 Street" }));
  });

  it("calls deleteUserProfile when clicking delete", async () => {
    (getUserProfile as jest.Mock).mockResolvedValue({ name: "John", address: "123 Street" });

    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    const deleteButton = await screen.findByText("Delete Account");
    fireEvent.click(deleteButton);

    await waitFor(() => expect(deleteUserProfile).toHaveBeenCalledWith("123"));
  });

  it("shows login message when no user is found", () => {
    const noUserStore = mockStore({ user: null });

    render(
      <Provider store={noUserStore}>
        <Profile />
      </Provider>
    );

    expect(screen.getByText("Please log in to view your profile.")).toBeInTheDocument();
  });
});
