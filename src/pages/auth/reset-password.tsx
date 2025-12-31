import { useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputField from '@/components/ui/custom/input';
import { useEffect, useState } from 'react';
import EyeClosed from '@/assets/jsx-icons/eye-closed';
import EyeOpened from '@/assets/jsx-icons/eye-opened';
import { MUTATIONS } from '@/lib/queries';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { useNavigate } from '@tanstack/react-router';

const formSchema = z.object({
  password: z.string().min(6, {
    error: 'Please enter a valid password.',
  }),
});

const ResetPassword = () => {
  const navigate = useNavigate({ from: '/auth/reset-password' });
  const [passwordType, setPasswordType] = useState<string>('password');
  const [resetInfo, setResetInfo] = useState<{
    accountId: string;
    passwordResetToken: string;
  } | null>(null);

  useEffect(() => {
    const storedResetInfo = sessionStorage.getItem('resetInfo');
    const resetInfo = storedResetInfo ? JSON.parse(storedResetInfo) : null;

    setResetInfo(resetInfo);
  }, []);

  const { mutate, isPending } = useSendRequest<
    { newPassword: string; passwordResetToken: string; accountId: string },
    any
  >({
    mutationFn: (data: {
      newPassword: string;
      passwordResetToken: string;
      accountId: string;
    }) => MUTATIONS.authResetPassword(data),
    successToast: {
      title: 'Success!',
      description: 'Now proceed to login.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: () => {
      navigate({ to: '/auth/login' });
      sessionStorage.removeItem('resetInfo');
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
      mutate({
        newPassword: value.password,
        passwordResetToken: resetInfo?.passwordResetToken!!,
        accountId: resetInfo?.accountId!!,
      });
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
        showSubmitButton
        isPending={isPending}
        label="Continue to login"
        className="justify-end"
      />
    </AuthFormWrapper>
  );
};

export default ResetPassword;
