import React, { useEffect } from "react";
import { GeneralState } from "../../context/GeneralContext";

const index = () => {
  const { setCurrentTab } = GeneralState();

  useEffect(() => {
    setCurrentTab("HomeSeller");
  }, []);

  return (
    <section className="main-container">
      <div className="sub-container-left">
        <h1 className="font-bold text-2xl">Inicio</h1>
      </div>
    </section>
  );
};

export default index;
