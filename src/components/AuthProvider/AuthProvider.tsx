import { useState, createContext } from "react";

interface AuthContextType {
  user: any;
  signIn: (user: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

interface IProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<any>(null);

  const signIn = (newUser: string, callback: VoidFunction) => {
    setUser(newUser);
    callback();
  };

  const signOut = (callback: VoidFunction) => {
    setUser(null);
    callback();
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
