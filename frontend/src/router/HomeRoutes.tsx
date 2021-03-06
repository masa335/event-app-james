import { Home } from "../components/pages/Home";
import { Signin  } from "../components/pages/Signin";
import { Page404 } from "../components/pages/Page404";
import { User } from "../components/pages/User";
import { CreateEvent } from "../components/pages/CreateEvent"
import { Signup } from "../components/pages/Signup";
import { Settings } from "../components/pages/Settings";
import { UpdatePassword } from "../components/pages/UpdatePassword";
import { EditEvent } from "../components/pages/EditEvent";
import { FollowingAndFollower } from "../components/pages/FollowingAndFollower";
import { Search } from "../components/pages/Search";

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
    path: "/updatePassword",
    exact: false,
    children: <UpdatePassword />
  },
  {
    path: "/user/:id",
    exact: false,
    children: <User />
  },
  {
    path: "/search",
    exact: false,
    children: <Search />
  },
  {
    path: "/following/:id",
    exact: false,
    children: <FollowingAndFollower defaultIndex={0} />
  },
  {
    path: "/followers/:id",
    exact: false,
    children: <FollowingAndFollower defaultIndex={1} />
  },
  {
    path: "/create",
    exact: false,
    children: <CreateEvent />
  },
  {
    path: "/event/:id",
    exact: false,
    children: <EditEvent />
  },
  {
    path: "/settings",
    exact: false,
    children: <Settings />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];

export const NotSignedInRoutes = [
  { 
    path: "/",
    exact: true,
    children: <Home />
  },
  {
    path: "/login",
    exact: false,
    children: <Signin />
  },
  {
    path: "/signup",
    exact: false,
    children: <Signup />
  },
  {
    path: "/search",
    exact: false,
    children: <Search />
  },
  {
    path: "*",
    exact: false,
    children: <Signin />
  }
];