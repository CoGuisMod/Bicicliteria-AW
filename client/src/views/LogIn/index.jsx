import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import MessageCard from "../../components/elements/MessageCard";
import { FaUserAlt } from "react-icons/fa";

const index = () => {
  const { logIn, setMessage } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await logIn(email, password);
    } catch (e) {
      console.log(e.message, "Log In Error");
      setMessage("El usuario no existe");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <MessageCard />
      <div className="border rounded-3xl p-8">
        <FaUserAlt className="text-7xl mx-auto" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4 mt-8"
        >
          <input
            type="email"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="custom-input"
          />
          <button className="button-style text-xl mt-2">Ingresar</button>
        </form>
      </div>
    </section>
  );
};

export default index;
