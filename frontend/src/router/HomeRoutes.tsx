import { Home } from "../components/pages/Home";
import { Signin  } from "../components/pages/Signin";
import { Page404 } from "../components/pages/Page404";
import { User } from "../components/pages/User";
import { CreateEvent } from "../components/pages/CreateEvent"
import { Signup } from "../components/pages/Signup";

export const HomeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />
  },
  {
    path: "/signup",
    exact: false,
    children: <Signup />
  },
  {
    path: "/login",
    exact: false,
    children: <Signin />
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