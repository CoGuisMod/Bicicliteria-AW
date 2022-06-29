import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { GeneralState } from "../../context/GeneralContext";
import SignUpUser from "../../components/SignUpUser";
import UserCard from "../../components/elements/UserCard";

const Users = () => {
  const { getUsers, users } = UserAuth();
  const { setCurrentTab } = GeneralState();
  const [tab, setTab] = useState("signUpUser");

  useEffect(() => {
    setCurrentTab("UsersAdmin");
    getUsers();
  }, []);

  return (
    <div className="main-container">
      <div className="sub-container-left">
        <h1 className="font-bold text-2xl">Usuarios</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {users?.map((user) => (
            <UserCard
              email={user.email}
              rol={user.rol}
              firstName={user.first_name}
              lastName={user.last_name}
            />
          ))}
        </div>
      </div>
      <div className="sub-container-right">
        {tab === "signUpUser" && <SignUpUser />}
      </div>
    </div>
  );
};

export default Users;
