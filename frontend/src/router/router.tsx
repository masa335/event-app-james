import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { authState } from "../recoil/atoms/Auth";

import { HomeRoutes, NotSignedInRoutes } from "./HomeRoutes";

export const Router: VFC = memo(() => {

  const auth = useRecoilValue(authState);
  const isSignedIn = auth.isSignedIn;

  return (
    <Switch>
      {isSignedIn ?
      <Route path="/" render={({ match: { url } }) => (
        <Switch>
          {HomeRoutes.map((route) => (
            <Route key={route.path} exact={route.exact} path={route.path}>
              <HeaderLayout>
                {route.children}
              </HeaderLayout>
            </Route>
          ))}
        </Switch>
      )}/>
      :
      <Route path="/" render={({ match: { url } }) => (
        <Switch>
          {NotSignedInRoutes.map((route) => (
            <Route key={route.path} exact={route.exact} path={route.path}>
              <HeaderLayout>
                {route.children}
              </HeaderLayout>
            </Route>
          ))}
        </Switch>
      )}/>
      }
    </Switch>
  );
});