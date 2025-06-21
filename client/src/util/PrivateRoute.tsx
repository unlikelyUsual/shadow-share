import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { decodeToken, isTokenValid } from "../api/jwt";
import Navbar from "../components/Navbar/Navbar";
import { logout, type InitialStateType } from "../features/user/userSlice";
import { userAppDispatch, userAppSelect } from "../store";
import ToastHelper from "./ToastHelper";

const PrivateRoute: React.FC<any> = ({}) => {
  const userState = userAppSelect(
    (state) => state.user
  ) as unknown as InitialStateType;

  const navigate = useNavigate();
  const dispatch = userAppDispatch();

  useEffect(() => {
    const isValid = isTokenValid(decodeToken(userState.token));
    if (!isValid || !userState.user || userState.user === null) {
      dispatch(logout());
      navigate("/login");
      ToastHelper.info("Please login in");
    }
  }, []);

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
