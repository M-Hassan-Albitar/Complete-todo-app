/* eslint-disable react/prop-types */
import { useState, createContext, useContext } from "react";
import ToastInfo from "./ToastInfo";

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [toastInfo, setToastInfo] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleToast = (message) => {
    setToastInfo(true);
    setToastMessage(message);
    setTimeout(() => {
      setToastInfo(false);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={handleToast}>
      <ToastInfo show={toastInfo} message={toastMessage} />
      {children}
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  return useContext(ToastContext);
};
