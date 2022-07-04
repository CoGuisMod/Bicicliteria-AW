import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { GeneralState } from "../context/GeneralContext";
import MessageCard from "./elements/MessageCard";

const SignUpUser = () => {
  const { signUp, error, setError, users, updateUsers, setUpdateUsers } =
    UserAuth();

  const { setMessage } = GeneralState();

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
      setMessage("Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      console.log(error);
      return;
    }
    if (users.map((user) => user.email === email).includes(true)) {
      setMessage("El correo ya existe");
      return;
    } else {
      setMessage("");
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
      setMessage(e.message);
      console.log(e.message, "error");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center text-center h-full">
      <MessageCard />
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
