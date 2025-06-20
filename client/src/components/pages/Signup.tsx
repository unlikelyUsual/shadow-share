import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../../features/user/userApi";
import Navbar from "../Navbar/Navbar";

type FormType = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
};

const initialState: FormType = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  username: "",
};

const Signup: React.FC = () => {
  const [form, setForm] = useState<FormType>(initialState);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (Object.values(form).find((item) => item.trim().length === 0)) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setError("Password must match");
      setLoading(false);
      return;
    }

    console.log({ form });
    const { passwordConfirm, ...data } = form;
    await register(data).unwrap();
    navigate("/login");
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
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
              Create an account
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full"
            >
              <div className="flex max-w-[480px] w-full flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="text"
                    placeholder="Sam Wilson"
                    name="name"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60768a] p-4 text-base font-normal leading-normal"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] w-full flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="email"
                    placeholder="sam.wilson@shadowshare"
                    name="email"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60768a] p-4 text-base font-normal leading-normal"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] w-full flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="text"
                    placeholder="sam_wilson_98"
                    name="username"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60768a] p-4 text-base font-normal leading-normal"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] w-full flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60768a] p-4 text-base font-normal leading-normal"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] w-full flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="passwordConfirm"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60768a] p-4 text-base font-normal leading-normal"
                    value={form.passwordConfirm}
                    onChange={handleChange}
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
                    {loading || isLoading ? "Registering..." : "Register"}
                  </span>
                </button>
              </div>
              <p className="text-gray-600 font-bold">Or</p>
              <div className="flex px-4 py-3 w-full max-w-[480px] mx-auto">
                <Link
                  className="flex h-10 px-4 flex-1 items-center justify-center rounded-full border-2 text-sm font-bold bg-transparent hover:bg-blue-500 border-blue-600 hover:border-transparent text-blue-600 hover:text-white"
                  to="/login"
                >
                  Login
                </Link>
              </div>
              <p className="text-[#60768a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
