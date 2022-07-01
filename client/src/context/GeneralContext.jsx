import { createContext, useContext, useState } from "react";
import { firebaseFirestore } from "../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("");
  const [inventoryTab, setInventoryTab] = useState("addProduct");
  const [product, setProduct] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState(null);

  const [updateInventory, setUpdateInventory] = useState(false);

  const addProduct = async (imgUrl, name, color, price, stock, category) => {
    const docuRef = collection(firebaseFirestore, "products");
    await addDoc(docuRef, {
      img_url: imgUrl,
      name: name,
      color: color,
      price: price,
      stock: stock,
      category: category,
    });
  };

  const deleteProduct = async (id) => {
    const docuRef = doc(firebaseFirestore, `products`, id);
    await deleteDoc(docuRef);
  };

  const editProduct = async (id, name, color, price, stock, category) => {
    const docuRef = doc(firebaseFirestore, "products", id);
    await updateDoc(docuRef, {
      name: name,
      color: color,
      price: price,
      stock: stock,
      category: category,
    });
  };

  const getProducts = async () => {
    const docuRef = collection(firebaseFirestore, "products");
    const initialData = await getDocs(docuRef);
    const finalData = initialData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(finalData);
  };

  return (
    <GeneralContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        inventoryTab,
        setInventoryTab,
        addProduct,
        deleteProduct,
        product,
        setProduct,
        editProduct,
        getProducts,
        currentProduct,
        setCurrentProduct,
        products,
        setProduct,
        updateInventory,
        setUpdateInventory,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export function GeneralState() {
  return useContext(GeneralContext);
}
