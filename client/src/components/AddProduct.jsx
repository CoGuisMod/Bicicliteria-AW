import React, { useEffect, useState } from "react";
import { GeneralState } from "../context/GeneralContext";
import { firebaseStorage } from "../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";

const errorMessageVariant = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const AddProduct = () => {
  const { addProduct, updateInventory, setUpdateInventory } = GeneralState();

  const [imgUrl, setImgUrl] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const uploadImage = () => {
    const storageRef = ref(firebaseStorage, `/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      image === "" ||
      name === "" ||
      color === "" ||
      price === "" ||
      stock === "" ||
      category === ""
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (image !== "" && imgUrl === "") {
      setError("Primero debe subir la imagen");
      return;
    }
    if (stock < 0) {
      setError("El stock no puede ser menor a 0");
      return;
    }
    if (price < 0) {
      setError("El precio no puede ser menor a 0");
      return;
    }
    if (imgUrl !== "") {
      await addProduct(imgUrl, name, color, price, stock, category);
      setUpdateInventory(!updateInventory);
    }
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <div className="flex flex-col justify-start items-center text-center h-full">
      {error ? (
        <motion.div
          animate={showError ? "open" : "closed"}
          variants={errorMessageVariant}
          className="absolute top-4 bg-black rounded-xl px-4 py-3 -translate-x-1/2 custom-shadow"
        >
          {error}
        </motion.div>
      ) : null}
      <h2 className="text-2xl">Añadir Producto</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center gap-6 h-full mt-8"
      >
        <div className="relative flex justify-center items-center border rounded-3xl w-full h-32">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button
            onClick={uploadImage}
            className="absolute right-2 bottom-2 bg-clr-primary-two rounded-full text-clr-primary-one p-2"
          >
            <FaUpload className="text-xl" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Producto"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          className="text-lg custom-input"
        />
        <input
          type="text"
          placeholder="Color"
          defaultValue={color}
          onChange={(e) => setColor(e.target.value)}
          className="text-lg custom-input"
        />
        <input
          type="text"
          placeholder="Precio"
          defaultValue={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-lg custom-input"
        />
        <div className="flex justify-between items-center gap-4">
          <input
            type="number"
            placeholder="Cantidad"
            defaultValue={stock}
            onChange={(e) => setStock(e.target.value)}
            className="text-lg custom-input"
          />
          <select
            defaultValue={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="bg-clr-primary-one text-lg"
          >
            <option value="">Categoría</option>
            <option value="Bicicleta">Bicicleta</option>
            <option value="Casco">Casco</option>
            <option value="Gafas">Gafas</option>
          </select>
        </div>
        <button className="self-end text-lg mr-4 mt-auto mb-4 button-style">
          Añadir
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
