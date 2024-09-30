 
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SidebarProvider } from "./context/sidebarContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";


ReactDOM.createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </SidebarProvider>
);
