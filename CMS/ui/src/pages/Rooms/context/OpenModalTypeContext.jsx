import { createContext, useState, useContext } from "react";

const OpenModalTypeContext = createContext(null);

export const OpenModalTypeProvider = ({ children }) => {
  const [openModalType, setOpenModalType] = useState(null);
  const [modalData, setModalData] = useState({});

  return (
    <OpenModalTypeContext.Provider
      value={{ openModalType, setOpenModalType, modalData, setModalData }}
    >
      {children}
    </OpenModalTypeContext.Provider>
  );
};

export const useOpenModalTypeContext = () => {
  const context = useContext(OpenModalTypeContext);
  if (context === undefined) {
    throw new Error(
      "useOpenModalContext must be used within an OpenModalProvider"
    );
  }
  return context;
};
