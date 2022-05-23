import { createContext, Dispatch, SetStateAction } from 'react';

export type TGlobalContext = {
  isAuth: boolean,
  setIsAuth: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<TGlobalContext>({
  isAuth: false,
  setIsAuth: () => {},
});
