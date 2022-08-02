import React from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: JSX.Element;
  restricted?: Boolean;
  redirectTo?: string;
}

function PublicRoute({ children, restricted = false, redirectTo = "/" }: IProps) {
  // const user = useAuth();

  const shouldRedirect = true && restricted;

  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
}

export { PublicRoute };
