import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';
import { Toaster } from '@/components/ui/sonner';

export type RouterContext = {
  queryClient: QueryClient;
};

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <NuqsAdapter>
        <Outlet />
        <Toaster />
      </NuqsAdapter>
      <TanStackRouterDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  );
}
