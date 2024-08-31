/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { redirect, usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IAuthProvider {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  login: (user: string, password: string) => Promise<void>;
  logout: () => void;
}

interface ChildrenProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('@token:access');
    const storedUser = localStorage.getItem('@user:data');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (user: string, password: string) => {
    try {
      if (user === 'admin' && password === '12345678') {
        const userData = {
          id: 1,
          name: 'Bruno',
          email: 'admin@admin',
        };

        setUser(userData);

        localStorage.setItem('@token:access', '123');
        localStorage.setItem('@user:data', JSON.stringify(userData));
        router.push('/clientes');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser({} as IUser);
    localStorage.removeItem('@token:access');
    localStorage.removeItem('@user:data');
    router.push('/');
  };

  const isAuthenticated = !!user.id;

  const publicRoutes = ['/'];

  useEffect(() => {
    if (!loading && !isAuthenticated && !publicRoutes.includes(pathname)) {
      redirect('/');
    }
  }, [loading, isAuthenticated, pathname]);

  const authValues = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      isAuthenticated,
      publicRoutes,
    }),
    [user]
  );

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
