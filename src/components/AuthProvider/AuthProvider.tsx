import { useState, createContext } from "react";
import { api } from "api";
import { ICredentials } from "interfaces";
import { User } from "types";

interface IAuthContext {
  user: User;
  signIn: (user: ICredentials) => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>(null!);

interface IProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<User>(null);

  const signIn = async (credentials: ICredentials) => {
    try {
      const user = await api.user.signIn(credentials);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await api.user.signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const getCurrentUser = async () => {
    try {
      const user = await api.user.getCurrentUser();
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const value = { user, signIn, signOut, getCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
