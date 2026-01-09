export const QUERY_KEYS = {
  account: {
    all: ['account'],
    me: () => [...QUERY_KEYS.account.all, 'me-detailed'],
    bussiness: () => [...QUERY_KEYS.account.all, 'business-info'],
  },
  events: {
    all: ['events'],
    paginated: (page: number, limit: number) => [
      ...QUERY_KEYS.events.all,
      { page, limit },
    ],
    info: (id: string) => [...QUERY_KEYS.events.all, 'info', { id }],
    guests: (page: number, limit: number, eventId: string) => [
      ...QUERY_KEYS.events.all,
      'guests',
      { page, limit, eventId },
    ],
    parties: (eventId: string) => [
      ...QUERY_KEYS.events.all,
      'parties',
      { eventId },
    ],
  },
};
