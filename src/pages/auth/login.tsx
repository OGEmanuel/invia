import { revalidateLogic, useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputField from '@/components/ui/custom/input';
import Envelope from '@/assets/jsx-icons/envelope';
import EyeOpened from '@/assets/jsx-icons/eye-opened';
import { useState } from 'react';
import EyeClosed from '@/assets/jsx-icons/eye-closed';
import { Link, useRouter, useSearch } from '@tanstack/react-router';
import { MUTATIONS } from '@/lib/queries';
import useSendRequest from '@/lib/hooks/useSendRequest';

const formSchema = z.object({
  email: z.email({
    error: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    error: 'Please enter a valid password.',
  }),
});

const Login = () => {
  const [passwordType, setPasswordType] = useState<string>('password');
  const router = useRouter();
  const search = useSearch({
    from: '/auth/login',
  });

  const { mutate, isPending } = useSendRequest<
    { email: string; password: string },
    { data: { token: string } }
  >({
    mutationFn: (data: { email: string; password: string }) =>
      MUTATIONS.authSignin(data),
    successToast: {
      title: 'Success!',
      description: 'Login successful.',
    },
    cookie: {
      name: 'rf',
      getValue: (data: { data: { token: string } }) => {
        const [, token] = data.data.token.split(' ');
        return token;
      },
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: () => {
      if (search.redirect) {
        router.history.push(search.redirect);
      } else {
        router.navigate({ to: '/', search: { page: 1, limit: 12 } });
      }
    },
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
    },
  });

  const handlePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <AuthFormWrapper
      legend="Login to continue"
      description={
        <>
          {`Don’t`} have an account?{' '}
          <Link
            to="/auth/sign-up"
            className="text-[#6155F5] no-underline! hover:text-[#6155F5]!"
          >
            Sign up
          </Link>
        </>
      }
      formId="login"
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
              iconPosition="left"
              type="email"
              icon={<Envelope />}
            />
          );
        }}
      />
      <form.Field
        name="password"
        children={field => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <InputField
              field={field}
              isInvalid={isInvalid}
              label="Enter your password"
              placeholder="Enter password"
              type={passwordType}
              iconPosition="right"
              icon={
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={handlePasswordType}
                >
                  {passwordType !== 'password' ? <EyeClosed /> : <EyeOpened />}
                </button>
              }
            />
          );
        }}
      />

      <FormFooter isPending={isPending} showSubmitButton label="Login">
        <Link to="/auth/forgot-password">Forgot password?</Link>
      </FormFooter>
    </AuthFormWrapper>
  );
};

export default Login;
