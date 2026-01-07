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
  },
};
