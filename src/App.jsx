import { useState } from "react";
import "./App.css";
import AddForm from "./components/AddForm";
import ToastInfo from "./components/ToastInfo";
import { ToastContext } from "./components/ToastContext";

function App() {
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
    <>
      <ToastContext.Provider value={{ handleToast }}>
        <ToastInfo show={toastInfo} message={toastMessage} />
        <AddForm />
      </ToastContext.Provider>
    </>
  );
}

export default App;
