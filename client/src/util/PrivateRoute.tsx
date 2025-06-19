import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import type { InitialStateType } from "../features/user/userSlice";
import { userAppSelect } from "../store";
import ToastHelper from "./ToastHelper";

const PrivateRoute: React.FC<any> = ({}) => {
  const userState = userAppSelect(
    (state) => state.user
  ) as unknown as InitialStateType;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.user || userState.user === null) {
      navigate("/login");
      ToastHelper.info("Please login in");
    }
  }, [userState]);

  return (
    <div className="min-h-screen flex flex-col text-black">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Outlet />
        <div className="mt-10 mb-6 text-center text-gray-400 text-sm animate-fade-in">
          <p>© 2025 Contact Management. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default PrivateRoute;
