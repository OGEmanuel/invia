import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();
  const navigate = useNavigate({ from: '/auth' });

  useEffect(() => {
    if (pathname === '/auth' || pathname === '/auth/') {
      navigate({ to: '/auth/login' });
    }
  }, [pathname]);

  return <Outlet />;
}
