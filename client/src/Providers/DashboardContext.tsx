import { useContext, createContext } from 'react';
type TDashboardContext = {
  prevLocationPath: string;
};

export const DashboardContext = createContext<TDashboardContext>({} as TDashboardContext);
export const useDashboardContext = () => useContext(DashboardContext);
