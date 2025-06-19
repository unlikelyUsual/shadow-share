import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLoginUserMutation } from "../../features/user/userApi";
import ToastHelper from "../../util/ToastHelper";
import Navbar from "../Navbar/Navbar";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!username || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      await loginUser({ username, password }).unwrap();
      ToastHelper.success("User Loged in!");
      navigate("/dashboard");
    } catch (err: unknown) {
      ToastHelper.error("Something went wrong");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // The main container with font styles - typically fonts are loaded globally in index.css
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[512px] py-5 flex-1">
            <h2 className="text-[#111518] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Welcome back
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full"
            >
              <div className="flex max-w-[480px] w-full flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60768a] p-4 text-base font-normal leading-normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] w-full flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60768a] p-4 text-base font-normal leading-normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </div>
              {error && (
                <p className="text-red-600 text-sm text-center mt-2">{error}</p>
              )}
              <div className="flex px-4 py-3 w-full max-w-[480px] mx-auto">
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#0b80ee] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || isLoading}
                >
                  <span className="truncate">
                    {loading || isLoading ? "Logging in..." : "Login"}
                  </span>
                </button>
              </div>
              <p>
                Don't have account,{" "}
                <Link className="text-blue-600" to="/signup">
                  Sign up now!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
