import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./views/LogIn";
import Navbar from "./components/Navbar";

/* Contexts Imports Open */
import { AuthContextProvider } from "./context/AuthContext";
import { GeneralContextProvider } from "./context/GeneralContext";
/* Contexts Imports Close */

/* Admin Views Imports Open */
import AdminHome from "./views/AdminView";
import AdminInventory from "./views/AdminView/Inventory";
import AdminSellsHistory from "./views/AdminView/SellsHistory";
import AdminUsers from "./views/AdminView/Users";
/* Admin Views Imports Close */

/* Seller Views Imports Open */
import SellerHome from "./views/SellerView";
import History from "./views/SellerView/History";
/* Seller Views Imports Close */

/* Protected Routes Open */
import Logged from "./components/ProtectedRoutes/Logged";
import UserSeller from "./components/ProtectedRoutes/UserSeller";
import UserAdmin from "./components/ProtectedRoutes/UserAdmin";
/* Protected Routes Close */

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <GeneralContextProvider>
          <Navbar />
          <Routes>
            {/* Login Route Open */}
            <Route
              path="/"
              element={
                <Logged>
                  <LogIn />
                </Logged>
              }
            />
            {/* Login Route Close */}

            {/* Seller Routes Open */}
            <Route
              path="/seller"
              element={
                <UserSeller>
                  <SellerHome />
                </UserSeller>
              }
            />
            <Route
              path="/seller/history"
              element={
                <UserSeller>
                  <History />
                </UserSeller>
              }
            />
            {/* Seller Routes Close */}

            {/* Admin Routes Open */}
            <Route
              path="/admin"
              element={
                <UserAdmin>
                  <AdminHome />
                </UserAdmin>
              }
            />
            <Route
              path="/admin/inventory"
              element={
                <UserAdmin>
                  <AdminInventory />
                </UserAdmin>
              }
            />
            <Route
              path="/admin/sells_history"
              element={
                <UserAdmin>
                  <AdminSellsHistory />
                </UserAdmin>
              }
            />
            <Route
              path="/admin/users"
              element={
                <UserAdmin>
                  <AdminUsers />
                </UserAdmin>
              }
            />
            {/* Admin Routes Close */}
          </Routes>
        </GeneralContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
