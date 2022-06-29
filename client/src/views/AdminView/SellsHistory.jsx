import React, { useEffect } from "react";
import { GeneralState } from "../../context/GeneralContext";

const SellsHistory = () => {
  const { setCurrentTab } = GeneralState();

  useEffect(() => {
    setCurrentTab("SellsHistoryAdmin");
  }, []);

  return (
    <section className="main-container">
      <div className="sub-container-left">
        <h1 className="font-bold text-2xl">SellsHistory</h1>
      </div>
      <div className="sub-container-right">
        <h1>SellsHistory sub</h1>
      </div>
    </section>
  );
};

export default SellsHistory;
