import React from "react";
import { Link } from "react-router-dom";
import { GeneralState } from "../../context/GeneralContext";
import { AiFillHome } from "react-icons/ai";

const NavItemsMechanic = () => {
  const { currentTab, setCurrentTab } = GeneralState();

  const handleHomeMechanic = () => {
    setCurrentTab("HomeMechanic");
  };

  return (
    <nav className="mt-2 space-y-4">
      <Link
        to="/seller"
        onClick={handleHomeMechanic}
        className={`nav-item ${
          currentTab === "HomeMechanic" ? "text-clr-thertiary-one" : null
        }`}
      >
        <AiFillHome />
        <div className="nav-item-sub">
          <div className="nav-item-sub-arrow"></div>
          <span>Inicio</span>
        </div>
      </Link>
    </nav>
  );
};

export default NavItemsMechanic;
