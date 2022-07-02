import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const errorMessageVariant = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const SignUpUser = () => {
  const { signUp, error, setError, users, updateUsers, setUpdateUsers } =
    UserAuth();
  const [showError, setShowError] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("seller");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      console.log(error);
      return;
    }
    if (users.map((user) => user.email === email).includes(true)) {
      setError("El correo ya existe");
      return;
    } else {
      setError("");
    }
    try {
      await signUp(email, password, rol, firstName, lastName);
      setUpdateUsers(!updateUsers);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (e) {
      setError(e.message);
      console.log(e.message, "error");
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
    <div className="flex flex-col justify-start items-center text-center h-full">
      {error ? (
        <motion.div
          animate={showError ? "open" : "closed"}
          variants={errorMessageVariant}
          className="absolute top-4 bg-black rounded-xl px-4 py-3 -translate-x-1/2 custom-shadow"
        >
          {error}
        </motion.div>
      ) : null}
      <h2 className="text-2xl">Crear Usuario</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center gap-6 h-full mt-8"
      >
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nombre"
            onChange={(e) => setFirstName(e.target.value)}
            className="text-lg custom-input"
          />
          <input
            type="text"
            placeholder="Apellido"
            onChange={(e) => setLastName(e.target.value)}
            className="text-lg custom-input"
          />
        </div>
        <input
          type="email"
          placeholder="Correo"
          onChange={(e) => setEmail(e.target.value)}
          className="text-lg custom-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="text-lg custom-input"
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="text-lg custom-input"
        />
        <select
          onChange={(e) => {
            setRol(e.target.value);
          }}
          className="self-start bg-clr-primary-one text-lg"
        >
          <option value="seller">Vendedor</option>
          <option value="mechanic">Mecanico</option>
          <option value="admin">Administrador</option>
        </select>
        <button className="self-end text-lg mr-4 mt-auto mb-4 button-style">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default SignUpUser;
