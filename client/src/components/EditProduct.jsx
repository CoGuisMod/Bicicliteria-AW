import React, { useEffect, useState } from "react";
import { GeneralState } from "../context/GeneralContext";

const EditProduct = () => {
  const { currentProduct, editProduct, updateInventory, setUpdateInventory } =
    GeneralState();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    editProduct(currentProduct.id, name, color, price, stock, category);
    setUpdateInventory(!updateInventory);
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
