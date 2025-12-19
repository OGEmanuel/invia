import AuthLayout from '@/pages/auth/layout';
import SignUp from '@/pages/auth/sign-up';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}
