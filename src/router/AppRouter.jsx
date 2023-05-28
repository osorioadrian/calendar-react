import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CalendarPage } from '../calendar';
import { LoginPage } from '../auth';

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
  return (
    <RouterProvider router={router} />
  )
}
