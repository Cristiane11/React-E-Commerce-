import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.user);
  return user ? (children as React.ReactElement) : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

