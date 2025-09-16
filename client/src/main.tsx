import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { CampProvider } from "./context/CampContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CampProvider>
      <App />
    </CampProvider>
  </React.StrictMode>
);
