import { useState } from "react";
import { userAppSelect } from "../../store";

const Profile = () => {
  const userState = userAppSelect((store) => store.user.user);

  const [form, setForm] = useState({
    password: "",
    passwordConfirm: "",
    name: "",
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <section className="relative pt-36 pb-24">
        <img
          src="https://pagedone.io/asset/uploads/1705471739.png"
          alt="cover-image"
          className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
        />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center relative z-10 mb-2.5">
            <img
              src="https://pagedone.io/asset/uploads/1705471668.png"
              alt="user-avatar-image"
              className="border-4 border-solid border-white rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <button className="rounded-full border border-solid border-gray-300 bg-gray-50 py-3 px-4 text-sm font-semibold text-gray-900 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-50 hover:bg-gray-100 hover:border-gray-300">
                Message
              </button>
              <button className="rounded-full border border-solid border-indigo-600 bg-indigo-600 py-3 px-4 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-indigo-700 hover:border-indigo-700">
                Book a Session
              </button>
            </div>
          </div>
          <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3">
            {userState.name}
          </h3>
          <p className="font-normal text-base leading-7 text-gray-500 text-center mb-8">
            {userState.email}
          </p>
          <div className="flex items-center justify-center gap-5">
            <div className="max-w-[480px] w-full flex-wrap items-end gap-4 px-4 py-3 mx-auto">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
