import { memo, useEffect, VFC } from "react";
import { Route, Switch } from "react-router-dom";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { useCurrentUser } from "../hooks/useCurrentUser";

import { HomeRoutes } from "./HomeRoutes";

export const Router: VFC = memo(() => {

  return (
    <Switch>
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
    </Switch>
  );
});