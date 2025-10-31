import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./pages/Home";
import ShoppingCart from "./components/ShoppingCart";


const queryClient = new QueryClient();

const App: React.FC = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Home />
        <ShoppingCart />
      </div>
    </QueryClientProvider>
  </Provider>
);

export default App;