import React from "react";
import { GeneralState } from "../../context/GeneralContext";

const ProductCard = ({ product }) => {
  const { setCurrentProduct } = GeneralState();

  let currency = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleClick = () => {
    setCurrentProduct(product);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer border rounded-xl p-2">
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
