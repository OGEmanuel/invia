import BusinessInfo from '@/pages/auth/business-info';
import AuthLayout from '@/pages/auth/layout';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/auth/business-info')({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});

function RouteComponent() {
  return (
    <AuthLayout>
      <BusinessInfo />
    </AuthLayout>
  );
}
