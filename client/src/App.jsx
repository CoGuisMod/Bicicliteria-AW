import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./views/LogIn";
import Navbar from "./components/Navbar";
import AdminHome from "./views/AdminView";
import AdminInventory from "./views/AdminView/Inventory";
import AdminSellsHistory from "./views/AdminView/SellsHistory";
import AdminUsers from "./views/AdminView/Users";
import { AuthContextProvider } from "./context/AuthContext";
import { GeneralContextProvider } from "./context/GeneralContext";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <GeneralContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route
              path="/admin/sells_history"
              element={<AdminSellsHistory />}
            />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Routes>
        </GeneralContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
