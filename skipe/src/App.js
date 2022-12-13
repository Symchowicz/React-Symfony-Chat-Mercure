import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";


export default function App() {

  const [loggedUser, setLoggedUser] = useState({});

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard loggedUser={loggedUser}/>,
    },
  ]);


  if (!loggedUser.JWT) {
    return <Login setLoggedUser={setLoggedUser}/>;
  }
  return <RouterProvider router={router}/>;
}
