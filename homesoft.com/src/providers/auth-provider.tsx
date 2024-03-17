import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface AuthProviderType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  showLogin: boolean;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  showRegister: boolean;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
}
const defaultValues = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  showLogin: false,
  setShowLogin: () => {},
  showRegister: false,
  setShowRegister: () => {},
};

export const authContext = createContext<AuthProviderType>(defaultValues);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(defaultValues.isLoggedIn);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn,showLogin, setShowLogin, showRegister, setShowRegister }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
