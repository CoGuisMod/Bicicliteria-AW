import React, { useEffect } from "react";
import { GeneralState } from "../../context/GeneralContext";
import ProductCard from "../../components/elements/ProductCard";
import { FaPlus, FaRedo } from "react-icons/fa";
import SellCheck from "../../components/SellCheck";

const index = () => {
  const {
    setCurrentTab,
    inventoryTab,
    setInventoryTab,
    getProducts,
    products,
    updateInventory,
    setUpdateInventory,
  } = GeneralState();

  useEffect(() => {
    setCurrentTab("HomeSeller");
    setInventoryTab("addProduct");
    getProducts();
  }, [updateInventory]);

  return (
    <section className="main-container">
      <div className="sub-container-left overflow-y-scroll">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Inventario</h1>
          <div className="flex space-x-4">
            {/* <button
              onClick={() => setInventoryTab("addProduct")}
              className="flex items-center gap-2 hover:text-clr-thertiary-one"
            >
              <span className="font-medium text-lg">Añadir</span>
              <FaPlus className="text-2xl" />
            </button> */}
            <button
              onClick={() => setUpdateInventory(!updateInventory)}
              className="flex items-center gap-2 hover:text-clr-thertiary-one"
            >
              <span className="font-medium text-lg">Actualizar</span>
              <FaRedo className="text-xl" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 justify-start mt-4 pr-4 py-4 overflow-y-scroll">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="sub-container-right">
        <SellCheck />
      </div>
    </section>
  );
};

export default index;
