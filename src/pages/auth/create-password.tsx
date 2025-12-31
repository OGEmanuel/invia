import { useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputField from '@/components/ui/custom/input';
import { useState } from 'react';
import EyeClosed from '@/assets/jsx-icons/eye-closed';
import EyeOpened from '@/assets/jsx-icons/eye-opened';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import type { AccountInfo } from '@/lib/constants';
import { useNavigate } from '@tanstack/react-router';

const formSchema = z.object({
  password: z.string().min(6, {
    error: 'Please enter a valid password.',
  }),
});

const CreatePassword = () => {
  const navigate = useNavigate({ from: '/auth/create-password' });
  const [passwordType, setPasswordType] = useState<string>('password');

  const { mutate, isPending } = useSendRequest<
    { password: string },
    { data: AccountInfo }
  >({
    mutationFn: (data: { password: string }) =>
      MUTATIONS.authInitializeAccountPassword(data),
    successToast: {
      title: 'Success!',
      description: 'Now proceed to customize your profile.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
  });

  const form = useForm({
    defaultValues: {
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: (data?: { data: AccountInfo }) => {
          if (!data?.data.isBusinessProfileUpdated) {
            navigate({ to: '/auth/business-info' });
          } else if (!data?.data.isAccountDisabled) {
            navigate({ to: '/' });
          } else {
            navigate({ to: '/auth/sign-up' });
          }
        },
      });
    },
  });

  const handlePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <AuthFormWrapper
      legend="Create your password"
      description="Choose a password to secure your account."
      formId="create-password"
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
      <FormFooter
        isPending={isPending}
        showSubmitButton
        label="Continue"
        className="justify-end"
      />
    </AuthFormWrapper>
  );
};

export default CreatePassword;
