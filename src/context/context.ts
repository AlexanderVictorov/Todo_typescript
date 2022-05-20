import { createContext } from 'react';

export type TGlobalContext = {
  isAuth: boolean,
  setIsAuth: (a: boolean) => void
}

export const AuthContext = createContext<TGlobalContext>({
  isAuth: false,
  setIsAuth: () => {},
});
