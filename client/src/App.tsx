import "./App.css";
import { NavbarHome, Body } from "./routes";

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
