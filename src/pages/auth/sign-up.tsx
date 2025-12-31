import { useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputField from '@/components/ui/custom/input';
import Envelope from '@/assets/jsx-icons/envelope';
import { Link, useNavigate } from '@tanstack/react-router';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';

const formSchema = z.object({
  name: z.string().min(2, {
    error: 'Please enter a valid name.',
  }),
  email: z.email({
    error: 'Please enter a valid email address.',
  }),
});

const SignUp = () => {
  const navigate = useNavigate({ from: '/auth/sign-up' });

  const { mutate, isPending } = useSendRequest<
    { name: string; email: string },
    { data: { signupVerificationHash: string } }
  >({
    mutationFn: (data: { name: string; email: string }) =>
      MUTATIONS.authSignup(data),
    successToast: {
      title: 'Success!',
      description: 'Please check your email for a verification code.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    verificationHash: {
      name: 'svh',
      getValue: (data: { data: { signupVerificationHash: string } }) =>
        data.data.signupVerificationHash,
    },
    onSuccessCallback: () => {
      navigate({ to: '/auth/verify-email' });
    },
  });

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => {
          sessionStorage.setItem('user', JSON.stringify(value));
        },
      });
    },
  });

  return (
    <AuthFormWrapper
      legend="Start managing your event guest lists"
      description="Enter your name and email to get started."
      formId="sign-up"
      form={form}
    >
      <form.Field
        name="name"
        children={field => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <InputField
              field={field}
              isInvalid={isInvalid}
              label="Name"
              placeholder="Enter your personal name"
            />
          );
        }}
      />
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

      <FormFooter showSubmitButton label="Continue" isPending={isPending}>
        <div className="leading-6">
          <p className="inline">Have an account?</p>{' '}
          <Link to="/auth/login" className="text-[#6155F5]">
            Log in
          </Link>
        </div>
      </FormFooter>
    </AuthFormWrapper>
  );
};

export default SignUp;
