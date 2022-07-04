import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { GeneralState } from "../context/GeneralContext";
import { firebaseStorage } from "../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import AddProductValidation from "../utils/validations/AddProductValidation";
import MessageCard from "./elements/MessageCard";
import { FaUpload } from "react-icons/fa";

const AddProduct = () => {
  const { setMessage } = UserAuth();
  const { addProduct, updateInventory, setUpdateInventory } = GeneralState();

  /* Product Data Open */
  const [imgUrl, setImgUrl] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  /* Product Data Close */

  const uploadImage = () => {
    const storageRef = ref(firebaseStorage, `/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (progress === 100) {
          setMessage("Imagen subida correctamente");
        }
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
    const validation = AddProductValidation(
      image,
      imgUrl,
      name,
      color,
      price,
      stock,
      category
    );
    if (validation.length === 0) {
      await addProduct(imgUrl, name, color, price, stock, category);
      setUpdateInventory(!updateInventory);
      setMessage("Producto agregado correctamente");
      setImage("");
      setImgUrl("");
      setName("");
      setColor("");
      setPrice("");
      setStock("");
      setCategory("");
    }
    if (validation.length > 0) {
      setMessage(validation);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center text-center h-full">
      <MessageCard />
      <h2 className="text-2xl">Añadir Producto</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center gap-6 h-full mt-8"
      >
        <div className="relative flex justify-center items-center border rounded-3xl w-full h-32">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <div
            defaultValue={image}
            onClick={uploadImage}
            className="cursor-pointer absolute right-2 bottom-2 bg-clr-primary-two rounded-full text-clr-primary-one p-2"
          >
            <FaUpload className="text-xl" />
          </div>
        </div>
        <input
          type="text"
          placeholder="Producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-lg custom-input"
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="text-lg custom-input"
        />
        <input
          type="text"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-lg custom-input"
        />
        <div className="flex justify-between items-center gap-4">
          <input
            type="number"
            placeholder="Cantidad"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="text-lg custom-input"
          />
          <select
            value={category}
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
