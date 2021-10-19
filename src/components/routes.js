import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Boxes } from "../pages/Boxes";
import { Chairs } from "../pages/Chairs";
import { Some } from "../pages/Some";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/boxes" exact>
        <Boxes />
      </Route>
      <Route path="/chairs" exact>
        <Chairs />
      </Route>
      <Route path="/some" exact>
        <Some />
      </Route>
      <Redirect to="/boxes" />
    </Switch>
  );
};
