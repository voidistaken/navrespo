import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import Home from "../pages/Home";
import LoginForm from "../pages/LoginForm";
import Contact from '../pages/Contact'
import Help from '../pages/Help'
import Terms from '../pages/Terms'
import AdminLayout from "../layouts/AdminLayout";
import DriverLoginFrom from "../pages/DriverLoginFrom";
import RiderRegistrationForm from "../pages/RiderRegistrationForm";
import Dashboard from "../pages/Dashboard";
import RiderLayout from "../layouts/RiderLayout";
import DriverLayout from "../layouts/DriverLayout";

import AboutDriver from "../components/AboutDriver";
import Testing from "../components/Testing";
import RiderDashboard from "../pages/RiderDashboard";
import DriverDashboard from "../pages/DriverDashoard";
import RideRider from "../pages/RideRider";
import RideDriver from "../pages/RideDriver";

export const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/rider/register",
        element: <RiderRegistrationForm />,
      },
      {
        path: "/driver/register",
        element: <DriverLoginFrom />,
      },
      {
        path: "/rider",
        element: <DriverLoginFrom />,
      },
      {
        path: "/driver",
        element: <AboutDriver />,
      },
      {
        path: "/test",
        element: <Testing />,
      },
      {
        path: "*",
        element: <p>404 | Not found</p>,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    element: <RiderLayout />,
    children: [
      {
        path: "/rider/dashboard",
        element: <RiderDashboard />,
      },
      {
        path: "/rider/ride/:rideId",
        element: <RideRider />,
      },
    ],
  },
  {
    element: <DriverLayout />,
    children: [
      {
        path: "/driver/dashboard",
        element: <DriverDashboard />,
      },
      {
        path: "/driver/ride/:rideId",
        element: <RideDriver />,
      },
    ],
  },
]);
