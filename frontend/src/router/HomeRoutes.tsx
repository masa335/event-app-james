import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { User } from "../components/pages/User";
import { CreateEvent } from "../components/pages/CreateEvent"

export const HomeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />
  },
  {
    path: "/login",
    exact: false,
    children: <Login />
  },
  {
    path: "/user",
    exact: false,
    children: <User />
  },
  {
    path: "/create",
    exact: false,
    children: <CreateEvent />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];