import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
