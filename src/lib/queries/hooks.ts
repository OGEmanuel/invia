import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { QUERIES } from '.';

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: QUERY_KEYS.account.me(),
    queryFn: () => QUERIES.getAccountMeDetailed(),
  });
};

export const useGetBusinessInfo = () => {
  return useQuery({
    queryKey: QUERY_KEYS.account.bussiness(),
    queryFn: () => QUERIES.getBusinessInfo(),
  });
};

export const useGetAllEvents = (page: number, limit: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.events.paginated(page, limit),
    queryFn: () => QUERIES.getEvents(page, limit),
  });
};
