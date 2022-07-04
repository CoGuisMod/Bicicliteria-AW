const AddUserValidation = (
  users,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  rol
) => {
  let error = "";

  /* Empty inputs validations Open */
  if (firstName === "") {
    error = "El nombre es necesario";
    return error;
  }
  if (lastName === "") {
    error = "El apellido es necesario";
    return error;
  }
  if (email === "") {
    error = "El correo es necesario";
    return error;
  }
  if (password === "") {
    error = "La contraseña es necesaria";
    return error;
  }
  if (password !== confirmPassword) {
    error = "Las contraseñas no coinciden";
    return error;
  }
  if (rol === "") {
    error = "Seleccione un rol";
    return error;
  }
  /* Empty inputs validations Close */

  if (password.length < 6) {
    error = "La contraseña debe tener al menos 6 caracteres";
    return error;
  }

  if (users.map((user) => user.email === email).includes(true)) {
    error = "El correo ya existe";
    return error;
  }

  return error;
};

export default AddUserValidation;
