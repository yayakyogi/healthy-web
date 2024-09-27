import OnBoardingPage from "@pages/onboarding";
import ProfilePage from "@pages/profile";
import WeightPage from "@pages/weight";
import { Navigate, RouteObject } from "react-router-dom";

export default [
  {
    path: "/",
    element: <Navigate to="/onboarding" />,
  },
  {
    path: "/onboarding",
    element: <OnBoardingPage />,
  },
  {
    path: "/weight",
    element: <WeightPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
] as RouteObject[];
