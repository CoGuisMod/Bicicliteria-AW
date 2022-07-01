import React, { useEffect, useState } from "react";
import { GeneralState } from "../../context/GeneralContext";
import ProductCard from "../../components/elements/ProductCard";
import EditProduct from "../../components/EditProduct";
import { FaPlus, FaRedo } from "react-icons/fa";
import AddProduct from "../../components/AddProduct";

const Inventory = () => {
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
    setCurrentTab("InventoryAdmin");
    setInventoryTab("addProduct");
    getProducts();
  }, [updateInventory]);

  return (
    <section className="main-container">
      <div className="sub-container-left overflow-y-scroll">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Inventario</h1>
          <div className="space-x-4">
            <button
              onClick={() => setInventoryTab("addProduct")}
              className="add-button"
            >
              <FaPlus className="text-2xl" />
            </button>
            <button
              onClick={() => setUpdateInventory(!updateInventory)}
              className="update-button"
            >
              <FaRedo className="text-xl" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 justify-start items-start mt-4 pr-4 py-4 h-full overflow-y-scroll">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="sub-container-right">
        {inventoryTab === "addProduct" ? <AddProduct /> : <EditProduct />}
      </div>
    </section>
  );
};

export default Inventory;
