import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import type { UseQueryOptions, QueryObserverResult } from '@tanstack/react-query';
import type t from 'librechat-data-provider';
import { QueryKeys,dataService } from 'librechat-data-provider';
import store from '~/store';

export const useGetUserQuery = (
  config?: UseQueryOptions<t.TUser>,
): QueryObserverResult<t.TUser> => {
  const queriesEnabled = useRecoilValue<boolean>(store.queriesEnabled);
  return useQuery<t.TUser>([QueryKeys.user], () => dataService.getUser(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    ...config,
    enabled: (config?.enabled ?? true) === true && queriesEnabled,
  });
};
