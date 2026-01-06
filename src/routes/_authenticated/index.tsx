import type { AccountInfo } from '@/lib/constants';
import { QUERIES } from '@/lib/queries';
import { QUERY_KEYS } from '@/lib/queries/query-keys';
import Events from '@/pages/home/events';
import RootLayout from '@/pages/home/layout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  loader: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: QUERY_KEYS.account.me(),
      queryFn: () => QUERIES.getAccountMeDetailed(),
    });

    const userInfo: AccountInfo = user.data;

    if (!userInfo.isPasswordUpdated) {
      throw redirect({
        to: '/auth/create-password',
        replace: true,
      });
    }

    if (!userInfo.isBusinessProfileUpdated) {
      throw redirect({
        to: '/auth/business-info',
        replace: true,
      });
    }

    if (userInfo.isAccountDisabled) {
      throw redirect({
        to: '/auth/sign-up',
        replace: true,
      });
    }

    return user;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RootLayout>
      <Events />
    </RootLayout>
  );
}
