import React, { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // Changed from email to username based on HTML placeholder
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

    // Simulate API call for login
    try {
      // In a real app, you'd make a fetch/axios call to your backend /login endpoint
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password }), // Use username here
      // });
      // const data = await response.json();

      // if (response.ok) {
      //   // onLoginSuccess({ name: data.user.name, email: data.user.email }); // Removed onLoginSuccess call
      //   console.log('Login successful (mock)! User:', { name: data.user.name, email: data.user.email });
      // } else {
      //   setError(data.error || 'Login failed. Please check your credentials.');
      // }

      // --- Mock Login Success ---
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      if (username === "testuser" && password === "password123") {
        // Mock credentials
        // onLoginSuccess({ name: 'Test User', email: 'test@example.com' }); // Removed onLoginSuccess call
        console.log(
          "Login successful (mock)! User: Test User, test@example.com"
        );
        // You'll need to handle navigation/state update in the parent component (App.jsx)
        // For example, by using useNavigate hook here if this component manages its own navigation.
      } else {
        setError("Invalid username or password.");
      }
      // --- End Mock Login Success ---
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Placeholder for navigation to signup, as onNavigateToSignup prop is removed
  const handleNavigateToSignupClick = () => {
    console.log(
      "Navigate to Signup clicked (onNavigateToSignup prop removed). Handle navigation in parent."
    );
    // You'll need to handle navigation in the parent component (App.jsx)
    // For example, by using useNavigate hook here if this component manages its own navigation.
  };

  return (
    // The main container with font styles - typically fonts are loaded globally in index.css
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111518]">
            <div className="size-4">
              {/* SVG Icon */}
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_319)">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_319">
                    <rect width="48" height="48" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">
              Whisper
            </h2>
          </div>
          <button
            onClick={handleNavigateToSignupClick} // Changed to local handler
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Register</span>
          </button>
        </header>

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[512px] py-5 flex-1">
            {" "}
            {/* Removed fixed max-w, adjusted for better centering */}
            <h2 className="text-[#111518] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Welcome back
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full"
            >
              {" "}
              {/* Added form tag and items-center for centering */}
              <div className="flex max-w-[480px] w-full flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                {" "}
                {/* Added mx-auto for centering */}
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="text" // Changed type to text for username
                    placeholder="Username"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60768a] p-4 text-base font-normal leading-normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] w-full flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                {" "}
                {/* Added mx-auto for centering */}
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
                {" "}
                {/* Added mx-auto for centering */}
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#0b80ee] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <span className="truncate">
                    {loading ? "Logging in..." : "Login"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
