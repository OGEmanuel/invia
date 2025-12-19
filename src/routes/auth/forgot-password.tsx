import ForgotPassword from '@/pages/auth/forgot-password';
import AuthLayout from '@/pages/auth/layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  );
}
