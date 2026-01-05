// 'use client';

// import { useState, useEffect, createContext, useContext } from 'react';
// import { HelmetProvider } from 'react-helmet-async';

// interface AuthContextType {
//   isLoggedIn: boolean;
//   isAdmin: boolean;
//   handleLogin: () => void;
//   handleLogout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   isLoggedIn: false,
//   isAdmin: false,
//   handleLogin: () => {},
//   handleLogout: () => {},
// });

// export const useAuth = () => useContext(AuthContext);

// export function Providers({ children }: { children: React.ReactNode }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const isAdminLoggedIn = !!sessionStorage.getItem("isAdminLoggedIn");
//       setIsLoggedIn(isAdminLoggedIn);
//       setIsAdmin(isAdminLoggedIn);
//     }
//   }, []);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     setIsAdmin(true);
//     if (typeof window !== 'undefined') {
//       sessionStorage.setItem("isAdminLoggedIn", "true");
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setIsAdmin(false);
//     if (typeof window !== 'undefined') {
//       sessionStorage.removeItem("isAdminLoggedIn");
//     }
//   };

//   return (
//     <HelmetProvider>
//       <AuthContext.Provider value={{ isLoggedIn, isAdmin, handleLogin, handleLogout }}>
//         {children}
//       </AuthContext.Provider>
//     </HelmetProvider>
//   );
// }










//UPDATED CODE BY SAGAR









'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { HelmetProvider } from 'react-helmet-async';

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isAdmin: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const getInitialAuthState = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("isAdminLoggedIn") === "true";
    }
    return false;
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getInitialAuthState);
  const [isAdmin, setIsAdmin] = useState<boolean>(getInitialAuthState);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
    sessionStorage.setItem("isAdminLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    sessionStorage.removeItem("isAdminLoggedIn");
  };

  return (
    <HelmetProvider>
      <AuthContext.Provider value={{ isLoggedIn, isAdmin, handleLogin, handleLogout }}>
        {children}
      </AuthContext.Provider>
    </HelmetProvider>
  );
}


