import { useField, useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputOTPField from '@/components/ui/custom/input-otp';
import useTimer from '@/lib/hooks/useTimer';
import LoadingSpinner from '@/assets/jsx-icons/loading-spinner';
import { useEffect } from 'react';

const formSchema = z.object({
  code: z.string().min(6, {
    error: 'Code must be 6 digits.',
  }),
});

const VerifyEmail = () => {
  const { formattedTime, handleStartTimer, timerRunning } = useTimer(30);

  const form = useForm({
    defaultValues: {
      code: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
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
          <span className="font-medium text-[#212121]">
            bojnuga.empire@gmail.com
          </span>{' '}
          to continue
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
            onClick={handleStartTimer}
            className="cursor-pointer leading-[100%] font-medium tracking-[-0.02em] text-[#6155F5]"
          >
            Resend Code
          </button>
        )}
        <LoadingSpinner className="animate-spin" />
      </FormFooter>
    </AuthFormWrapper>
  );
};

export default VerifyEmail;
