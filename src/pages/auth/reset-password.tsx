import { useForm } from '@tanstack/react-form';
import AuthFormWrapper from './components/form';
import { z } from 'zod';
import InputField from '@/components/ui/custom/input';
import { useState } from 'react';
import EyeClosed from '@/assets/jsx-icons/eye-closed';
import EyeOpened from '@/assets/jsx-icons/eye-opened';

const formSchema = z.object({
  password: z.string().min(6, {
    message: 'Please enter a valid password.',
  }),
});

const ResetPassword = () => {
  const [passwordType, setPasswordType] = useState<string>('password');

  const form = useForm({
    defaultValues: {
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const handlePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <AuthFormWrapper
      legend="Set a new password"
      description="Choose a new password for your account."
      formId="reset-password"
      label="Continue to login"
      form={form}
    >
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
    </AuthFormWrapper>
  );
};

export default ResetPassword;
