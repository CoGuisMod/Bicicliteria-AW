import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { GeneralState } from "../../context/GeneralContext";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { user } = UserAuth();
  const {
    deleteProduct,
    setInventoryTab,
    setCurrentProduct,
    updateInventory,
    setUpdateInventory,
    productList,
    setProductList,
    checkProduct,
    setCheckProduct,
  } = GeneralState();

  const [addProduct, setAddProduct] = useState(false);

  let currency = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleClickAdmin = () => {
    setCurrentProduct(product);
    setInventoryTab("editProduct");
  };

  const handleClickSeller = () => {
    setAddProduct(!addProduct);
    if (productList.includes(product)) {
      setProductList(productList.filter((check) => check !== product));
      setCheckProduct(
        checkProduct.filter((check) => check.productId !== product.id)
      );
    } else {
      setProductList([...productList, product]);
    }
  };

  const handleDelete = () => {
    deleteProduct(product.id);
    setUpdateInventory(!updateInventory);
  };

  return (
    <div
      onClick={user.rol === "admin" ? handleClickAdmin : null}
      className={`${
        user.rol === "admin" ? "cursor-pointer" : null
      } relative border rounded-xl p-2`}
    >
      {user.rol === "admin" ? (
        <div
          onClick={handleDelete}
          className="cursor-pointer absolute right-0 top-0 bg-clr-primary-two rounded-full text-clr-primary-one hover:text-clr-thertiary-one z-10 p-2 translate-x-1/2 -translate-y-1/2"
        >
          <FaTrashAlt />
        </div>
      ) : (
        <div
          onClick={handleClickSeller}
          className="cursor-pointer absolute right-0 top-0 bg-clr-primary-two rounded-full text-clr-primary-one hover:text-clr-thertiary-one z-10 p-2 translate-x-1/2 -translate-y-1/2"
        >
          {addProduct ? <FaMinus /> : <FaPlus />}
        </div>
      )}
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
