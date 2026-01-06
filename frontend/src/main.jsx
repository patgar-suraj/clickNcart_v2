import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <ScrollToTop />
      <ToastContainer
        toastClassName={() =>
          "relative flex p-3 rounded-lg justify-between overflow-hidden cursor-pointer bg-black text-white font-bold shadow-lg"
        }
        bodyClassName={() => "text-sm font-medium"}
        progressClassName="bg-yellow-400"
      />
      <App />
    </BrowserRouter>
  </Provider>
);
