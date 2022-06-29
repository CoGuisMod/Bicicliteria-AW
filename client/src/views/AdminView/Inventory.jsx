import React, { useEffect } from "react";
import { GeneralState } from "../../context/GeneralContext";
import ProductCard from "../../components/elements/ProductCard";
import EditProduct from "../../components/EditProduct";

const Inventory = () => {
  const { setCurrentTab, currentProduct, getProducts, products } =
    GeneralState();

  console.log(currentProduct);

  useEffect(() => {
    setCurrentTab("InventoryAdmin");
    getProducts();
  }, []);

  return (
    <section className="main-container">
      <div className="sub-container-left">
        <h1 className="font-bold text-2xl">Inventario</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {products?.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
      <div className="sub-container-right">
        <EditProduct />
      </div>
    </section>
  );
};

export default Inventory;
