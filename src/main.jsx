import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoggedInUserProvider } from "./context/LoggedInUserContext.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NavBar from "./components/NavBar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div>
        Error! <br /> Page Not Found! <br />
        <button>Home</button>
      </div>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoggedInUserProvider>
      <NavBar />
      <RouterProvider router={router} />
    </LoggedInUserProvider>
  </React.StrictMode>
);
