import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Service } from "../utils/Service";

// handle the public routes
function PublicRoute({ component: Component, restricted, ...rest }) {
  return (
    <Route {...rest} render={props => (Service.isLogin() && restricted ? <Redirect to="/" /> : <Component {...props} />  )} />
  )
}

export default PublicRoute;