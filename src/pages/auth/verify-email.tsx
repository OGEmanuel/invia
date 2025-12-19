import { useForm } from '@tanstack/react-form';
import AuthFormWrapper from './components/form';
import { z } from 'zod';
import InputOTPField from '@/components/ui/custom/input-otp';

const formSchema = z.object({
  code: z.string().min(6, {
    message: 'Code must be 6 digits.',
  }),
});

const VerifyEmail = () => {
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
      label="Send code"
      form={form}
      resendCode
      showSubmitButton={false}
    >
      <form.Field
        name="code"
        children={field => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return <InputOTPField field={field} isInvalid={isInvalid} />;
        }}
      />
    </AuthFormWrapper>
  );
};

export default VerifyEmail;
