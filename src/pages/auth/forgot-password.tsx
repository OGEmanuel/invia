import { useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputField from '@/components/ui/custom/input';
import Envelope from '@/assets/jsx-icons/envelope';
import { useNavigate } from '@tanstack/react-router';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';

const formSchema = z.object({
  email: z.email({
    error: 'Please enter a valid email address.',
  }),
});

const ForgotPassword = () => {
  const navigate = useNavigate({ from: '/auth/forgot-password' });

  const { mutate, isPending } = useSendRequest<{ email: string }, any>({
    mutationFn: (data: { email: string }) => MUTATIONS.authForgotPassword(data),
    successToast: {
      title: 'Success!',
      description: 'Please check your email for a verification code.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: () => {
      navigate({ to: '/auth/verify-reset-password' });
    },
  });

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(
        value,
        {
          onSuccess: () => {
            sessionStorage.setItem('email', value.email);
          },
        },
      );
    },
  });

  return (
    <AuthFormWrapper
      legend="Enter email to reset password"
      description="We’ll send a code to help you reset your password."
      formId="forgot-password"
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
              iconPosition="left"
              icon={<Envelope />}
            />
          );
        }}
      />
      <FormFooter
        isPending={isPending}
        showSubmitButton
        className="justify-end"
        label="Send Code"
      />
    </AuthFormWrapper>
  );
};

export default ForgotPassword;
