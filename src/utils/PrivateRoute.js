import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Service } from "../utils/Service";

// handle the private routes
const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route {...rest} render={props => ( Service.isLogin() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }, }}
  /> )} />
    );
}
export default PrivateRoute;