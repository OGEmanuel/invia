import AuthLayout from '@/pages/auth/layout';
import VerifyResetPassword from '@/pages/auth/verify-reset-password';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/verify-reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <VerifyResetPassword />
    </AuthLayout>
  );
}
