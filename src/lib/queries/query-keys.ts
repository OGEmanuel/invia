export const QUERY_KEYS = {
  account: {
    all: ['account'],
    me: () => [...QUERY_KEYS.account.all, 'me-detailed'],
    bussiness: () => [...QUERY_KEYS.account.all, 'business-info'],
  },
};
