import { AuthContext } from "components/AuthProvider";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export { useAuth };
