import "./App.css";
import AddForm from "./components/AddForm";
import { ToastProvider } from "./components/ToastContext";

function App() {
  return (
    <>
      <ToastProvider>
        <AddForm />
      </ToastProvider>
    </>
  );
}

export default App;
