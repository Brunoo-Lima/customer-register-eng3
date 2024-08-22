/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('@token:access');

    if (token) {
      setUser({
        id: 1,
        name: 'Bruno',
        email: 'admin@admin',
      });
    }
  }, []);

  const login = async (user: string, password: string) => {
    try {
      if (user === 'admin' && password === '12345678') {
        setUser({
          id: 1,
          name: 'Bruno',
          email: 'admin@admin',
        });

        localStorage.setItem('@token:access', '123');
        router.push('/clientes');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser({} as IUser);
    localStorage.removeItem('@token:access');
    router.push('/');
  };

  const authValues = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
    }),
    [user, login]
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
