import { useField, useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputOTPField from '@/components/ui/custom/input-otp';
import LoadingSpinner from '@/assets/jsx-icons/loading-spinner';
import useTimer from '@/lib/hooks/useTimer';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import { useNavigate } from '@tanstack/react-router';

const formSchema = z.object({
  code: z.string().min(6, {
    error: 'Code must be 6 digits.',
  }),
});

const VerifyResetPassword = () => {
  const { formattedTime, handleStartTimer, timerRunning } = useTimer(30);
  const [email, setEmail] = useState('');
  const navigate = useNavigate({ from: '/auth/verify-reset-password' });

  const { mutate, isPending } = useSendRequest<
    { email: string; otp: string },
    { data: { accountId: string; passwordResetToken: string } }
  >({
    mutationFn: (data: { email: string; otp: string }) =>
      MUTATIONS.authResetPasswordOtpVerification(data),
    successToast: {
      title: 'Success!',
      description: 'Now proceed to create your password.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: () => {
      navigate({ to: '/auth/reset-password' });
    },
  });

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      setEmail(email);
    }
  }, []);

  const { mutate: resentCode, isPending: resendCodeIsPending } = useSendRequest<
    { email: string },
    any
  >({
    mutationFn: (data: { email: string }) => MUTATIONS.authForgotPassword(data),
    successToast: {
      title: 'Success!',
      description: 'Please check your email for a verification code.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
  });

  const handleResendCode = () => {
    resentCode(
      {
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
      mutate(
        {
          email,
          otp: value.code,
        },
        {
          onSuccess: (data?: {
            data: { accountId: string; passwordResetToken: string };
          }) => {
            sessionStorage.setItem('resetInfo', JSON.stringify(data?.data));
          },
        },
      );
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
      legend="Enter 6 digit code to reset password"
      description={
        <>
          We sent a 6-digit code to{' '}
          <span className="font-medium text-[#212121]">{email}</span>
        </>
      }
      formId="verify-reset-password"
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

export default VerifyResetPassword;
