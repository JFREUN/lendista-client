import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminSignup from "./pages/AdminSignup";
import IsPrivate from "./components/isPrivate";
import IsAnon from "./components/isAnon";
import IsAdmin from "./components/isAdmin";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Basket from "./pages/Basket";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        {/* Member Pages */}

        {/* General */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <UserProfile />
            </IsPrivate>
          }
        />

        {/* Anon */}
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignUpPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        {/* Private */}
        <Route
          path="/basket"
          element={
            <IsPrivate>
              {" "}
              <Basket />
            </IsPrivate>
          }
        />

        {/* Admin Pages */}
        <Route
          path="/admin/signup"
          element={
            <IsAnon>
              <AdminSignup />
            </IsAnon>
          }
        />
        <Route
          path="/admin/login"
          element={
            <IsAnon>
              <AdminLogin />
            </IsAnon>
          }
        />

        <Route path="/admin/dashboard" element={<IsAdmin><Dashboard /></IsAdmin>}></Route>
      </Routes>
    </div>
  );
}

export default App;
