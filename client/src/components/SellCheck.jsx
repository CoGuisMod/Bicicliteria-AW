import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { GeneralState } from "../context/GeneralContext";
import { FaMoneyCheck } from "react-icons/fa";
import CheckProductList from "./elements/CheckProductList";
import { motion } from "framer-motion";

const errorMessageVariant = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const SellCheck = () => {
  const { user } = UserAuth();
  const {
    checkList,
    setCheckList,
    productList,
    setProductList,
    checkProduct,
    products,
  } = GeneralState();

  const [checkId, setCheckId] = useState(checkList.length + 1);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [checkTotal, setCheckTotal] = useState(0);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const [allowed, setAllowed] = useState(true);

  let currency = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < checkProduct.length; i++) {
      products.map((product) => {
        if (product.id === checkProduct[i].productId) {
          if (product.stock >= checkProduct[i].quantity) {
            product.stock -= checkProduct[i].quantity;
          } else {
            setError("Not enough stock");
            setAllowed(false);
            return;
          }
        } else {
          return;
        }
      });
    }
    if (allowed) {
      setCheckList([...checkList, { checkId, date, checkProduct, checkTotal }]);
      setCheckId(checkList.length + 1);
      setProductList([]);
      setCheckProduct([]);
      setCheckTotal(0);
    }
  };

  useEffect(() => {
    if (checkProduct.length > 0) {
      setCheckTotal(
        checkProduct.reduce((total, product) => {
          return total + product.totalPrice;
        }, 0)
      );
    } else {
      setCheckTotal(0);
    }
  }, [productList, checkProduct, checkList]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setError("");
      }, 3000);
    }
  }, [error]);

  console.log(checkList, "checkList");

  return (
    <div className="h-full">
      {error ? (
        <motion.div
          animate={showError ? "open" : "closed"}
          variants={errorMessageVariant}
          className="absolute top-4 bg-black rounded-xl px-4 py-3 -translate-x-1/2 custom-shadow"
        >
          {error}
        </motion.div>
      ) : null}
      <h1 className="font-bold text-xl">Facturar</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center gap-6 h-full"
      >
        <div className="flex justify-start items-start gap-4">
          <FaMoneyCheck className="text-9xl" />
          <div>
            <p>
              ID: <span>{checkId}</span>
            </p>
            <p>
              Fecha: <span>{date}</span>
            </p>
            <p>
              Usuario:{" "}
              <span>
                {user?.first_name} {user?.last_name}
              </span>
            </p>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-12 gap-2 bg-clr-primary-two font-bold text-clr-primary-one">
            <p className="col-span-1 mx-auto">ID</p>
            <p className="col-span-3 mx-auto">Producto</p>
            <p className="col-span-3 mx-auto">Cantidad</p>
            <p className="col-span-4 mx-auto">Precio</p>
          </div>
          {productList.map((product) => (
            <CheckProductList product={product} />
          ))}
          <div className="mt-2">
            <p className=" text-clr-thertiary-one text-center">
              Total:{" "}
              <span>{checkTotal ? currency.format(checkTotal) : "0.00"}</span>
            </p>
          </div>
        </div>
        <button className="self-end text-lg mr-4 mt-auto mb-4 button-style">
          Aceptar
        </button>
      </form>
    </div>
  );
};

export default SellCheck;
