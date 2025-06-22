import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import PageNotFound from "./components/pages/PageNotFound";
import Profile from "./components/pages/Profile";
import Signup from "./components/pages/Signup";
import { store } from "./store";
import PrivateRoute from "./util/PrivateRoute";
import PublicRoute from "./util/PublicRoute";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Default route / redirect to login if no path matches */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
};

export default App;
