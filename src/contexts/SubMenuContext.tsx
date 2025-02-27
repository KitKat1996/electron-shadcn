import React, { createContext, useContext, useState } from 'react';

interface SubMenuContextType {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  toggleMenu: () => void;
}

const SubMenuContext = createContext<SubMenuContextType | undefined>(undefined);

export function SubMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(true);

  const toggleMenu = () => setOpen(prev => !prev);

  return (
    <SubMenuContext.Provider value={{ isOpen, setOpen, toggleMenu }}>
      {children}
    </SubMenuContext.Provider>
  );
}

export function useSubMenu() {
  const context = useContext(SubMenuContext);
  if (context === undefined) {
    throw new Error('useSubMenu must be used within a SubMenuProvider');
  }
  return context;
}