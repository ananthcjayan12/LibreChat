import { useContext, createContext } from 'react';
type TShareContext = { isSharedConvo?: boolean };

export const ShareContext = createContext<TShareContext>({} as TShareContext);
export const useShareContext = () => useContext(ShareContext);
