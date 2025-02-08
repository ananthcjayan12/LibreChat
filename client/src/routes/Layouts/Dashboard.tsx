import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { useAuthContext, usePreviousLocation } from '~/hooks';
import { QueryKeys } from 'librechat-data-provider';
import { DashboardContext } from '~/Providers';
import store from '~/store';

export default function DashboardRoute() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthContext();
  const prevLocationRef = usePreviousLocation();
  const clearConvoState = store.useClearConvoState();
  const [prevLocationPath, setPrevLocationPath] = useState('');

  useEffect(() => {
    setPrevLocationPath(prevLocationRef.current?.pathname || '');
  }, [prevLocationRef]);

  useEffect(() => {
    queryClient.removeQueries([QueryKeys.messages, 'new']);
    clearConvoState();
  }, [queryClient, clearConvoState]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardContext.Provider value={{ prevLocationPath }}>
      <div className="h-screen w-full">
        <Outlet />
      </div>
    </DashboardContext.Provider>
  );
}
