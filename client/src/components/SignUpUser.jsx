import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import AddUserValidation from "../utils/validations/AddUserValidation";
import MessageCard from "./elements/MessageCard";

const SignUpUser = () => {
  const { signUp, users, updateUsers, setUpdateUsers, setMessage } = UserAuth();

  /* User Data Open */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("");
  /* User Data Close */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = AddUserValidation(
      users,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      rol
    );
    if (validation.length === 0) {
      await signUp(email, password, rol, firstName, lastName);
      setMessage("Usuario registrado correctamente");
      setUpdateUsers(!updateUsers);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRol("");
    }
    if (validation.length > 0) {
      setMessage(validation);
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="text-lg custom-input"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="text-lg custom-input"
          />
        </div>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-lg custom-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-lg custom-input"
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="text-lg custom-input"
        />
        <select
          value={rol}
          onChange={(e) => {
            setRol(e.target.value);
          }}
          className="self-start bg-clr-primary-one text-lg"
        >
          <option value="">Seleccione un rol</option>
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
