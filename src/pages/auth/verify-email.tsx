import { useField, useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputOTPField from '@/components/ui/custom/input-otp';
import useTimer from '@/lib/hooks/useTimer';
import LoadingSpinner from '@/assets/jsx-icons/loading-spinner';
import { useEffect, useState } from 'react';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import { useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import type { AccountInfo } from '@/lib/constants';

const formSchema = z.object({
  code: z.string().min(6, {
    error: 'Code must be 6 digits.',
  }),
});

const VerifyEmail = () => {
  const { formattedTime, handleStartTimer, timerRunning } = useTimer(30);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [svh, setSvh] = useState('');
  const navigate = useNavigate({ from: '/auth/verify-email' });

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const svh = sessionStorage.getItem('svh');

    if (svh) {
      setSvh(svh);
    }

    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, []);

  const { mutate, isPending } = useSendRequest<
    { signupVerificationHash: string; otp: string },
    { data: { token: string; accountInfo: AccountInfo } }
  >({
    mutationFn: (data: { signupVerificationHash: string; otp: string }) =>
      MUTATIONS.authSignupVerification(data),
    successToast: {
      title: 'Success!',
      description: 'Now proceed to create your password.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    cookie: {
      name: 'rf',
      getValue: (data: { data: { token: string } }) => {
        const [, token] = data.data.token.split(' ');
        return token;
      },
    },
    onSuccessCallback: () => {
      navigate({ to: '/auth/create-password' });
    },
  });

  const { mutate: resentCode, isPending: resendCodeIsPending } = useSendRequest<
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
      navigate({ to: '/auth/create-password' });
    },
  });

  const handleResendCode = () => {
    resentCode(
      {
        name,
        email,
      },
      {
        onSuccess: () => {
          handleStartTimer();
        },
      },
    );
  };

  const form = useForm({
    defaultValues: {
      code: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      mutate({
        signupVerificationHash: svh,
        otp: value.code,
      });
    },
  });

  const code = useField({
    name: 'code',
    form,
  });

  useEffect(() => {
    const shouldSubmit = code.state.value.length === 6;

    if (shouldSubmit) {
      form.handleSubmit();
    }
  }, [code]);

  return (
    <AuthFormWrapper
      legend="Verify your email address"
      description={
        <>
          Enter the 6-digit code sent to{' '}
          <span className="font-medium text-[#212121]">{email}</span> to
          continue
        </>
      }
      formId="verify-email"
      form={form}
    >
      <form.Field
        name="code"
        children={field => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return <InputOTPField field={field} isInvalid={isInvalid} />;
        }}
      />
      <FormFooter>
        {timerRunning ? (
          <p className="leading-[100%] text-[#A3A19D]">
            Resend code in {formattedTime}s
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendCodeIsPending}
            className={cn(
              'cursor-pointer leading-[100%] font-medium tracking-[-0.02em] disabled:cursor-not-allowed',
              resendCodeIsPending ? 'text-[#A3A19D]' : 'text-[#6155F5]',
            )}
          >
            {resendCodeIsPending ? 'Resending...' : 'Resend Code'}
          </button>
        )}
        {isPending && <LoadingSpinner className="animate-spin" />}
      </FormFooter>
    </AuthFormWrapper>
  );
};

export default VerifyEmail;
