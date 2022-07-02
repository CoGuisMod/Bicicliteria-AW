import { createContext, useContext, useEffect, useState } from "react";
import { firebaseFirestore } from "../firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const signUp = async (email, password, rol, firstName, lastName) => {
    const docuRef = doc(firebaseFirestore, "users", email);
    await setDoc(docuRef, {
      email: email,
      password: password,
      rol: rol,
      first_name: firstName,
      last_name: lastName,
    });
  };

  const logIn = async (email, password) => {
    const docuRef = doc(firebaseFirestore, `users/${email}`);
    const initialData = await getDoc(docuRef);
    const finalData = initialData.data();
    if (finalData.password !== password) {
      setError("Contraseña incorrecta");
      return;
    }
    if (finalData.password === password) {
      setUser(finalData);
      window.localStorage.setItem("user", JSON.stringify(finalData));
      if (finalData.rol === "seller") {
        navigate("/seller");
      }
      if (finalData.rol === "mechanic") {
        navigate("/mechanic");
      }
      if (finalData.rol === "admin") {
        navigate("/admin");
      }
    } else {
      return;
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  const deleteUser = async (email) => {
    const docuRef = doc(firebaseFirestore, `users`, email);
    await deleteDoc(docuRef);
  };

  const getUsers = async () => {
    const docuRef = collection(firebaseFirestore, "users");
    const initialData = await getDocs(docuRef);
    const finalData = initialData.docs.map((doc) => doc.data());
    setUsers(finalData);
  };

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        user,
        setUser,
        deleteUser,
        getUsers,
        users,
        setUsers,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth() {
  return useContext(AuthContext);
}
