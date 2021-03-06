import React from "react";
import { UserAuth } from "../../context/AuthContext";
import NavItemsSeller from "./NavItemsSeller";
import NavItemsMechanic from "./NavItemsMechanic";
import NavItemsAdmin from "./NavItemsAdmin";
import { FaBicycle, FaSignOutAlt } from "react-icons/fa";

const index = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    await logOut();
  };

  return user ? (
    <aside className="fixed text-4xl h-full z-10 p-4">
      <div className="flex flex-col items-center border rounded-3xl h-full p-2">
        <FaBicycle className=" text-clr-thertiary-one text-5xl" />

        {user?.rol === "admin" ? (
          <NavItemsAdmin />
        ) : user?.rol === "seller" ? (
          <NavItemsSeller />
        ) : user?.rol === "mechanic" ? (
          <NavItemsMechanic />
        ) : null}

        <div className="mt-auto">
          <button onClick={handleSignOut} className="text-clr-thertiary-one">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </aside>
  ) : null;
};

export default index;
