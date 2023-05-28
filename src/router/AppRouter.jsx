import { Navigate, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import { CalendarPage } from '../calendar';
import { LoginPage } from '../auth';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: "/auth/*",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <CalendarPage />,
  },
  {
    path: "/*",
    element: <Navigate to={"/auth/login"} />,
  },
]);


export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  }, []);

  if (status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }
  

  return (
    <RouterProvider router={router} />
  )
}
