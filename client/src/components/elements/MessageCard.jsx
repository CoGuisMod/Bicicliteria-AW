import React, { useEffect, useState } from "react";
import { GeneralState } from "../../context/GeneralContext";
import { motion } from "framer-motion";

const messageVariant = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const MessageCard = () => {
  const { message, setMessage } = GeneralState();

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessage("");
      }, 3000);
    }
  }, [message]);

  return message ? (
    <motion.div
      animate={showMessage ? "open" : "closed"}
      variants={messageVariant}
      className="absolute top-4 bg-black rounded-xl px-4 py-3 -translate-x-1/2 custom-shadow"
    >
      {message}
    </motion.div>
  ) : null;
};

export default MessageCard;
