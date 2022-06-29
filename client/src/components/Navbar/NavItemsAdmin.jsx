import React from "react";
import { Link } from "react-router-dom";
import { GeneralState } from "../../context/GeneralContext";
import { FaFileAlt, FaUserAlt, FaWarehouse } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

const NavItemsAdmin = () => {
  const { currentTab, setCurrentTab } = GeneralState();

  const handleHomeAdmin = () => {
    setCurrentTab("HomeAdmin");
  };

  const handleInventoryAdmin = () => {
    setCurrentTab("InventoryAdmin");
  };

  const handleSellsHistoryAdmin = () => {
    setCurrentTab("SellsHistoryAdmin");
  };

  const handleUsersAdmin = () => {
    setCurrentTab("UsersAdmin");
  };

  return (
    <nav className="mt-2 space-y-4">
      <Link
        to="/admin"
        onClick={handleHomeAdmin}
        className={`nav-item ${
          currentTab === "HomeAdmin" ? "text-clr-thertiary-one" : null
        }`}
      >
        <AiFillHome />
        <div className="nav-item-sub">
          <div className="nav-item-sub-arrow"></div>
          <span>Inicio</span>
        </div>
      </Link>
      <Link
        to="/admin/inventory"
        onClick={handleInventoryAdmin}
        className={`nav-item ${
          currentTab === "InventoryAdmin" ? "text-clr-thertiary-one" : null
        }`}
      >
        <FaWarehouse />
        <div className="nav-item-sub">
          <div className="nav-item-sub-arrow"></div>
          <span>Inventario</span>
        </div>
      </Link>
      <Link
        to="/admin/sells_history"
        onClick={handleSellsHistoryAdmin}
        className={`nav-item ${
          currentTab === "SellsHistoryAdmin" ? "text-clr-thertiary-one" : null
        }`}
      >
        <FaFileAlt />
        <div className="nav-item-sub">
          <div className="nav-item-sub-arrow"></div>
          <span>Facturas</span>
        </div>
      </Link>
      <Link
        to="/admin/users"
        onClick={handleUsersAdmin}
        className={`nav-item ${
          currentTab === "UsersAdmin" ? "text-clr-thertiary-one" : null
        }`}
      >
        <FaUserAlt />
        <div className="nav-item-sub">
          <div className="nav-item-sub-arrow"></div>
          <span>Usuarios</span>
        </div>
      </Link>
    </nav>
  );
};

export default NavItemsAdmin;
