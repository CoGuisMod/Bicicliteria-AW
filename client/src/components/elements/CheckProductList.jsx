import React, { useState } from "react";
import { GeneralState } from "../../context/GeneralContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useEffect } from "react";

const CheckProductList = ({ product }) => {
  const { productList, checkList, checkProduct, setCheckProduct } =
    GeneralState();

  const [productId, setProductId] = useState(product.id);
  const [id, setId] = useState(productList.length);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  let currency = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const isEven = (num) => num % 2 === 0;

  useEffect(() => {
    if (checkProduct.map((product) => product.id).includes(id)) {
      setCheckProduct(
        checkProduct.map((product) =>
          product.id === id
            ? { ...product, quantity: quantity, totalPrice: totalPrice }
            : product
        )
      );
    } else {
      setCheckProduct([
        ...checkProduct,
        { productId, id, product, quantity, totalPrice },
      ]);
    }
  }, [totalPrice]);

  useEffect(() => {
    setTotalPrice(quantity * product.price);
  }, [quantity]);

  return (
    <div>
      <div
        key={id}
        className={`${
          isEven(id) ? "bg-clr-primary-two" : null
        } grid grid-cols-12 gap-2`}
      >
        <p className="col-span-1 mx-auto">{id}</p>
        <p className="col-span-3">{product.name}</p>
        <div className="col-span-3 flex gap-2 ml-auto">
          <FaMinus onClick={handleMinus} className="cursor-pointer text-xl" />
          <p>{quantity}</p>
          <FaPlus onClick={handlePlus} className="cursor-pointer text-xl" />
        </div>
        <div className="col-span-4 ml-auto">
          <p>{currency.format(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckProductList;
