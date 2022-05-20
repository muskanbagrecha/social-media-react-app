import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { AppPovider } from "./provider/AppPovider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppPovider>
        <App />
      </AppPovider>
    </BrowserRouter>
  </React.StrictMode>
);
