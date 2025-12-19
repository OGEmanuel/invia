import BusinessInfo from '@/pages/auth/business-info';
import AuthLayout from '@/pages/auth/layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/business-info')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <BusinessInfo />
    </AuthLayout>
  );
}
