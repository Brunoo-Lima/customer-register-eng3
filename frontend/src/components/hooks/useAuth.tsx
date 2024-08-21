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
  password: string;
}

interface IAuthProvider {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  login: (user: string, password: string) => Promise<void>;
}

interface ChildrenProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const router = useRouter();

  useEffect(() => {
    setUser({
      id: 1,
      name: 'Bruno',
      password: 'admin',
    });
  }, []);

  const login = async (user: string, password: string) => {
    try {
      if (user === 'admin' && password === 'admin') {
        setUser({
          id: 1,
          name: 'Bruno',
          password,
        });

        console.log(user);
      }

      router.push('/clientes');
    } catch (err) {
      console.log(err);
    }
  };

  const authValues = useMemo(
    () => ({
      user,
      setUser,
      login,
    }),
    [user, login]
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
