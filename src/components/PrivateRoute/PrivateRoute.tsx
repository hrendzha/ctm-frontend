import { Navigate } from "react-router-dom";
import { useAuth } from "hooks";

interface IProps {
  children: JSX.Element;
  redirectTo?: string;
}

const PrivateRoute = ({ children, redirectTo = "/" }: IProps) => {
  const { user } = useAuth();

  return user ? children : <Navigate to={redirectTo} />;
};

export { PrivateRoute };
