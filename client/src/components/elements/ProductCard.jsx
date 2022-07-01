import React from "react";
import { GeneralState } from "../../context/GeneralContext";
import { FaTrashAlt } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const {
    deleteProduct,
    setInventoryTab,
    setCurrentProduct,
    updateInventory,
    setUpdateInventory,
  } = GeneralState();

  let currency = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleClick = () => {
    setCurrentProduct(product);
    setInventoryTab("editProduct");
  };

  const handleDelete = () => {
    deleteProduct(product.id);
    setUpdateInventory(!updateInventory);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer relative border rounded-xl p-2"
    >
      <div
        onClick={handleDelete}
        className="cursor-pointer absolute right-0 top-0 bg-clr-primary-two rounded-full text-clr-primary-one hover:text-clr-thertiary-one z-10 p-2 translate-x-1/2 -translate-y-1/2"
      >
        <FaTrashAlt />
      </div>
      <div className="rounded-lg overflow-hidden">
        <img src={product.img_url} alt={product.name} />
      </div>
      <h3 className="font-bold text-xl mt-2">
        {product.name} ({product.color})
      </h3>
      <p className="font-semibold mt-1">
        Price:{" "}
        <span className="font-normal">{currency.format(product.price)}</span>
      </p>
      <p className="font-semibold">
        Stock: <span className="font-normal">{product.stock}</span>
      </p>
      <p className="font-semibold">
        Categoria: <span className="font-normal">{product.category}</span>
      </p>
    </div>
  );
};

export default ProductCard;
