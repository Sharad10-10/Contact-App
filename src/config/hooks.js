import { useState } from "react";


const hooks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return {onClose, onOpen, isOpen}
};

export default hooks;
