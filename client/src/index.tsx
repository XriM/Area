import React, { Component }  from 'react';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

reportWebVitals();
