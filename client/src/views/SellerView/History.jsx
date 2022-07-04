import React from "react";
import { GeneralState } from "../../context/GeneralContext";

const History = () => {
  const { checkList } = GeneralState();
  console.log(checkList, "checkList History");

  let currency = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const isEven = (num) => num % 2 === 0;

  return (
    <section className="main-container">
      <div className="sub-container-left">
        <h1 className="font-bold text-2xl">Facturas</h1>
        <div className="w-full mt-4">
          <div className="grid grid-cols-12 mb-2 px-4">
            <p className="col-span-1"># ID</p>
            <p className="col-span-2">Fecha</p>
            <p className="col-span-6">Producto</p>
            <p className="col-span-3 ml-auto">Total</p>
          </div>
          {checkList.map((product) => (
            <div
              key={product.checkId}
              className={`grid grid-cols-12 ${
                isEven(product.checkId)
                  ? null
                  : "bg-clr-primary-two text-clr-primary-one"
              } px-4`}
            >
              <p className="col-span-1 ml-4">{product.checkId}</p>
              <p className="col-span-2">{product.date}</p>
              <div className="col-span-6">
                {product.checkProduct.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4">
                    <p>
                      {item.product.name} <span>(x{item.quantity})</span>
                    </p>
                    <p>{currency.format(item.totalPrice)}</p>
                  </div>
                ))}
              </div>
              <p className="col-span-3 ml-auto">
                {currency.format(product.checkTotal)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default History;
