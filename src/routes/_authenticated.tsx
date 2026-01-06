import { isAuthenticated } from '@/lib/utils';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth/login',
        replace: true,
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
