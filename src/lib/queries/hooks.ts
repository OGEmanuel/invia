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

export const useGetEventsInfo = (eventId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.events.info(eventId),
    queryFn: () => QUERIES.getEventInfo(eventId),
  });
};

export const useGetGuests = (page: number, limit: number, eventId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.events.guests(page, limit, eventId),
    queryFn: () => QUERIES.getGuests(page, limit, eventId),
  });
};

export const useGetEventParties = (eventId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.events.parties(eventId),
    queryFn: () => QUERIES.getEventParties(eventId),
  });
};
