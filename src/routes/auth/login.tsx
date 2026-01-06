import AuthLayout from '@/pages/auth/layout';
import Login from '@/pages/auth/login';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});

function RouteComponent() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}
