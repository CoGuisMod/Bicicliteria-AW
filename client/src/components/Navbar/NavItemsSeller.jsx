import React from "react";
import { Link } from "react-router-dom";
import { GeneralState } from "../../context/GeneralContext";
import { AiFillHome } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";

const NavItemsSeller = () => {
  const { currentTab, setCurrentTab } = GeneralState();

  const handleHomeSeller = () => {
    setCurrentTab("HomeSeller");
  };

  const handleHistorySeller = () => {
    setCurrentTab("HistorySeller");
  };

  return (
    <nav className="mt-2 space-y-4">
      <Link
        to="/seller"
        onClick={handleHomeSeller}
        className={`nav-item ${
          currentTab === "HomeSeller" ? "text-clr-thertiary-one" : null
        }`}
      >
        <AiFillHome />
        <div className="nav-item-sub">
          <div className="nav-item-sub-arrow"></div>
          <span>Inicio</span>
        </div>
      </Link>
      <Link
        to="/seller/history"
        onClick={handleHistorySeller}
        className={`nav-item ${
          currentTab === "HistorySeller" ? "text-clr-thertiary-one" : null
        }`}
      >
        <FaHistory />
        <div className="nav-item-sub">
          <div className="nav-item-sub-arrow"></div>
          <span>Facturas</span>
        </div>
      </Link>
    </nav>
  );
};

export default NavItemsSeller;
