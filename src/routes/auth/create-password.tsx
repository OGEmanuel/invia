import CreatePassword from '@/pages/auth/create-password';
import AuthLayout from '@/pages/auth/layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/create-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <CreatePassword />
    </AuthLayout>
  );
}
