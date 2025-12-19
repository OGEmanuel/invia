import { useForm } from '@tanstack/react-form';
import AuthFormWrapper from './components/form';
import { z } from 'zod';
import InputField from '@/components/ui/custom/input';
import Envelope from '@/assets/jsx-icons/envelope';
import { useNavigate } from '@tanstack/react-router';

const formSchema = z.object({
  email: z.email({
    message: 'Please enter a valid email address.',
  }),
});

const ForgotPassword = () => {
  const navigate = useNavigate({ from: '/auth/forgot-password' });

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      navigate({ to: '/auth/verify-reset-password' });
    },
  });

  return (
    <AuthFormWrapper
      legend="Enter email to reset password"
      description="We’ll send a code to help you reset your password."
      formId="forgot-password"
      label="Send code"
      form={form}
    >
      <form.Field
        name="email"
        children={field => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <InputField
              field={field}
              isInvalid={isInvalid}
              label="Email address"
              placeholder="Enter email"
              type="email"
              icon={<Envelope />}
            />
          );
        }}
      />
    </AuthFormWrapper>
  );
};

export default ForgotPassword;
