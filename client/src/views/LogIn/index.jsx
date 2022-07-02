import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";

const errorMessageVariant = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const index = () => {
  const { logIn, error, setError } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
    } catch (e) {
      setError("El usuario no existe");
    }
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <section className="flex justify-center items-center h-screen">
      {error ? (
        <motion.div
          animate={showError ? "open" : "closed"}
          variants={errorMessageVariant}
          className="absolute top-4 bg-black rounded-xl px-4 py-3 -translate-x-1/2 custom-shadow"
        >
          {error}
        </motion.div>
      ) : null}
      <div className="border rounded-3xl p-8">
        <FaUserAlt className="text-7xl mx-auto" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-6 mt-8"
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
