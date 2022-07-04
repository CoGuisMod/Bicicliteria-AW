import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { GeneralState } from "../context/GeneralContext";
import EditProductValidation from "../utils/validations/EditProductValidation";
import MessageCard from "./elements/MessageCard";

const EditProduct = () => {
  const { setMessage } = UserAuth();
  const { currentProduct, editProduct, updateInventory, setUpdateInventory } =
    GeneralState();

  /* Product Data Open */
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  /* Product Data Close */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = EditProductValidation(
      name,
      color,
      price,
      stock,
      category
    );
    if (validation.length === 0) {
      await editProduct(currentProduct.id, name, color, price, stock, category);
      setUpdateInventory(!updateInventory);
      setMessage("Producto editado correctamente");
    }
    if (validation.length > 0) {
      setMessage(validation);
    }
  };

  useEffect(() => {
    setName(currentProduct?.name);
    setColor(currentProduct?.color);
    setPrice(currentProduct?.price);
    setStock(currentProduct?.stock);
    setCategory(currentProduct?.category);
  }, [currentProduct]);

  return (
    <div className="flex flex-col justify-start items-center text-center h-full">
      <MessageCard />
      <h2 className="text-2xl">Editar Producto</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center gap-6 h-full mt-8"
      >
        <input
          type="text"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          className="text-lg custom-input"
        />
        <input
          type="text"
          defaultValue={color}
          onChange={(e) => setColor(e.target.value)}
          className="text-lg custom-input"
        />
        <input
          type="text"
          defaultValue={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-lg custom-input"
        />
        <div className="flex justify-between items-center gap-4">
          <input
            type="number"
            defaultValue={stock}
            onChange={(e) => setStock(e.target.value)}
            className="text-lg custom-input"
          />
          <select
            defaultValue={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="bg-clr-primary-one text-lg"
          >
            <option value="Bicicleta">Bicicleta</option>
            <option value="Casco">Casco</option>
            <option value="Gafas">Gafas</option>
          </select>
        </div>
        <button className="self-end text-lg mr-4 mt-auto mb-4 button-style">
          Editar
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
