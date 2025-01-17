import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import "./index.css";
import Root from "./routes/root";
import SignIn from "./routes/sign-in";
import User from "./routes/user";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Root />} />
          <Route index path="sign-in" element={<SignIn />} />
          <Route index path="user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
