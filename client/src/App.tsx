import React, { Component }  from 'react';
import "./App.css";
import { NavbarHome, Body } from "./routes/exports";

function App() {
  return (
    <div className="area" >
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <NavbarHome />
      <Body />
    </div>
  );
}

export default App;
