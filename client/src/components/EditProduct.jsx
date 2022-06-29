import React from "react";
import { GeneralState } from "../context/GeneralContext";

const EditProduct = () => {
  const { currentProduct } = GeneralState();

  return (
    <div>
      <div>
        <h2>Editar Producto</h2>
      </div>
      <form>
        <input type="text" defaultValue={currentProduct?.name} />
      </form>
    </div>
  );
};

export default EditProduct;
