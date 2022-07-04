const EditProductValidation = (name, color, price, stock, category) => {
  let error = "";

  /* Empty inputs validations Open */
  if (name === "") {
    error = "El nombre de producto es necesario";
    return error;
  }
  if (color === "") {
    error = "El color es necesario";
    return error;
  }
  if (price === "") {
    error = "El precio es necesario";
    return error;
  }
  if (stock === "") {
    error = "El stock es necesario";
    return error;
  }
  if (category === "") {
    error = "La categoria es necesaria";
    return error;
  }
  /* Empty inputs validations Close */

  if (price < 0) {
    error = "El precio no puede ser negativo";
    return error;
  }

  if (stock < 0) {
    error = "El stock no puede ser negativo";
    return error;
  }

  return error;
};

export default EditProductValidation;
