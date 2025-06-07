import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const PrivateRoute: React.FC<any> = ({}) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

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
