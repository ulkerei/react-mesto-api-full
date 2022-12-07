import React from "react";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {
  return(
    <Route>
      { () =>
        props.loggedOn ? <Component{...props} /> : <Redirect to="/signin" />
      }
    </Route>
  );
};

export default ProtectedRoute;