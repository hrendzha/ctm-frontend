import { Navigate } from "react-router-dom";
import { useAuth } from "hooks";

interface IProps {
  children: JSX.Element;
  restricted?: Boolean;
  redirectTo?: string;
}

function PublicRoute({ children, restricted = false, redirectTo = "/" }: IProps) {
  const { user } = useAuth();

  const shouldRedirect = user && restricted;

  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
}

export { PublicRoute };
