import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";

import { HomeRoutes } from "./HomeRoutes";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <Route path="/" render={({ match: { url } }) => (
        <Switch>
          {HomeRoutes.map((route) => (
            <Route key={route.path} exact={route.exact} path={route.path}>
              {route.children}
            </Route>
          ))}
        </Switch>
      )}/>
    </Switch>
  );
});