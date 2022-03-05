import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import 'jquery/dist/jquery.min.js';
import "popper.js/dist/umd/popper.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import "./index.css";
import { ContextDataProvider } from './Context/ContextData';
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
ReactDOM.render(
  <>
    <ContextDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextDataProvider>
  </>,
  document.getElementById("root")
);
