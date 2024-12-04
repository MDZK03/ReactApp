import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import UserPage from './screens/UserPage.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './screens/MainLayout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "users", element: <UserPage /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
