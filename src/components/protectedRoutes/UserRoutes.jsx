import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from '../dashboard/Dashboard'
import Posts from "../posts/Posts";
import Profile from "../Profile/Profile";
import cookie from "react-cookies";
export function PostsRoutes({ children, ...rest }) {
  const [user] = useState({
    token: cookie.load("token") || "",
  });
  return (
    <>
      <Route>
        {user.token ? (
          <Posts {...rest} />
        ) : (
          <Switch>
            <Redirect from="*" to="/signin"></Redirect>
          </Switch>
        )}
      </Route>
    </>
  );
}
export function ProfileRoutes({ children, ...rest }) {
  const [user] = useState({
    token: cookie.load("token") || "",
  });
  return (
    <>
      <Route>
        {user.token ? (
          <Profile {...rest} />
        ) : (
          <Switch>
            <Redirect from="*" to="/signin"></Redirect>
          </Switch>
        )}
      </Route>
    </>
  );
}
export function DashBoardRoutes({ children, ...rest }) {
  const [user] = useState({
    token: cookie.load("token") || "",
  });
  return (
    <>
      <Route>
        {user.token ? (
          <Dashboard {...rest} />
        ) : (
          <Switch>
            <Redirect from="*" to="/signin"></Redirect>
          </Switch>
        )}
      </Route>
    </>
  );
}
