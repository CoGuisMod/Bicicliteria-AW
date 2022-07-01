import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-Ofki15DiOtXdxM8zhk0Yjoo9bmqHlq4",
  authDomain: "bicicleteria-aw.firebaseapp.com",
  projectId: "bicicleteria-aw",
  storageBucket: "bicicleteria-aw.appspot.com",
  messagingSenderId: "528006304478",
  appId: "1:528006304478:web:b4f9fea28f3ebeeb70684f",
  measurementId: "G-HWNFQ3FC8Y",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseFirestore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export { firebaseApp, firebaseFirestore, firebaseStorage };
