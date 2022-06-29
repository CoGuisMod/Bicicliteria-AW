import { createContext, useContext, useState } from "react";
import { firebaseFirestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("");
  const [product, setProduct] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    const docuRef = collection(firebaseFirestore, "products");
    const initialData = await getDocs(docuRef);
    const finalData = initialData.docs.map((doc) => doc.data());
    setProducts(finalData);
  };

  return (
    <GeneralContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        product,
        setProduct,
        getProducts,
        currentProduct,
        setCurrentProduct,
        products,
        setProduct,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export function GeneralState() {
  return useContext(GeneralContext);
}
