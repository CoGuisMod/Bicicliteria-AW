import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";

const errorMessageVariant = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [customError, setCustomError] = useState("");

  const { logIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  console.log(error);

  useEffect(() => {
    if (error === "Firebase: Error (auth/user-not-found).") {
      setCustomError("No se encuentra el usuario");
    }
    if (error === "Firebase: Error (auth/wrong-password).") {
      setCustomError("Contraseña incorrecta");
    }
  }, [error]);

  return (
    <section className="flex justify-center items-center h-screen">
      <motion.div
        animate={customError ? "open" : "closed"}
        variants={errorMessageVariant}
        className="absolute top-4 bg-black rounded-xl px-4 py-3 -translate-x-1/2 custom-shadow"
      >
        {customError}
      </motion.div>
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
          <button className="button-style text-xl mt-8">Ingresar</button>
        </form>
      </div>
    </section>
  );
};

export default index;
