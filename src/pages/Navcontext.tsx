import { createContext, type Dispatch, type SetStateAction } from "react";

export type NavContextValue = {
  setbtnclick: Dispatch<SetStateAction<[boolean, boolean, boolean, boolean]>>;
};

const NavContext = createContext<NavContextValue | null>(null); // ✅ 타입 명시
export default NavContext;
