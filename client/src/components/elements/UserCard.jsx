import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { FaTrashAlt, FaUserAlt } from "react-icons/fa";

const UserCard = ({ email, rol, firstName, lastName }) => {
  const { deleteUser, updateUsers, setUpdateUsers } = UserAuth();

  const handleDelete = () => {
    deleteUser(email);
    setUpdateUsers(!updateUsers);
  };

  return (
    <div className="relative border rounded-xl p-4">
      <div
        onClick={handleDelete}
        className="cursor-pointer absolute right-0 top-0 bg-clr-primary-two rounded-full text-clr-primary-one hover:text-clr-thertiary-one p-2 translate-x-1/2 -translate-y-1/2"
      >
        <FaTrashAlt />
      </div>
      <FaUserAlt className="text-3xl mx-auto" />
      <p className="font-bold mt-4">
        {email} &#40;{rol}&#41;
      </p>
      <div className="flex gap-2 mt-2">
        <p>{firstName}</p>
        <p>{lastName}</p>
      </div>
    </div>
  );
};

export default UserCard;
