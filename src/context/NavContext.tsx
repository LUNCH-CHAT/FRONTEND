import { createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction, ReactNode } from 'react';

type NavContextType = {
  hideNav: boolean;
  setHideNav: Dispatch<SetStateAction<boolean>>;
};

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [hideNav, setHideNav] = useState(false);
  return (
    <NavContext.Provider value={{ hideNav, setHideNav }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within NavProvider');
  return ctx;
}
