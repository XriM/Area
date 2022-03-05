import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Profile from "./routes/profile/profile";
import MyWidgets from "./routes/my-widgets/my-widgets";
import CreateTrigger from "./routes/create/create";
import { OutlookSignin } from "./helper/services/outlook_onedrive";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/triggers" element={<MyWidgets />} />
      <Route path="/create" element={<CreateTrigger />} />
      <Route path="/outlook-onedrive-profile" element={<OutlookSignin/>} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

reportWebVitals();
