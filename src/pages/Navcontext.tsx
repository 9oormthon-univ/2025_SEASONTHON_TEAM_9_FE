// Navcontext.ts (또는 .tsx)
import { createContext, type Dispatch, type SetStateAction } from 'react';

export type NavContextValue = {
  setbtnclick: Dispatch<SetStateAction<[Boolean,Boolean,Boolean,Boolean]>>;
};

const NavContext = createContext<NavContextValue | null>(null); // ✅ 타입 명시
export default NavContext;
