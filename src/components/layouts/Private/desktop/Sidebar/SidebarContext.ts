import { createContext, useContextSelector } from 'use-context-selector';

type ISidebarDesktopContextData = {
  isOpen: boolean;
  handleActivateSidebar: () => void;
};

export const SidebarDesktopContext = createContext<ISidebarDesktopContextData>(
  {} as ISidebarDesktopContextData,
);

export const useSidebarDesktop = (): ISidebarDesktopContextData => {
  const isOpenSidebar = useContextSelector(
    SidebarDesktopContext,
    ({ isOpen }) => isOpen,
  );
  const handleActivate = useContextSelector(
    SidebarDesktopContext,
    ({ handleActivateSidebar }) => handleActivateSidebar,
  );

  return { handleActivateSidebar: handleActivate, isOpen: isOpenSidebar };
};
