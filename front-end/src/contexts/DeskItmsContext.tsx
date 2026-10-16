import { createContext, useState, type ReactNode } from "react";
import type { DeskItemType, DeskItemsContextType } from "../types/DeskItem";

// eslint-disable-next-line
export const DeskItmsContext = createContext<DeskItemsContextType>({
  deskItems: [],
  setDeskItems: () => {},
});

export const DeskItmsProvider = ({ children }: { children: ReactNode }) => {
  const [deskItems, setDeskItems] = useState<DeskItemType[]>([]);

  return (
    <DeskItmsContext.Provider value={{ deskItems, setDeskItems }}>
      {children}
    </DeskItmsContext.Provider>
  );
};
