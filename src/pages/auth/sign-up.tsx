import { useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputField from '@/components/ui/custom/input';
import Envelope from '@/assets/jsx-icons/envelope';
import EyeOpened from '@/assets/jsx-icons/eye-opened';
import { useState } from 'react';
import EyeClosed from '@/assets/jsx-icons/eye-closed';
import { Link } from '@tanstack/react-router';

const formSchema = z.object({
  email: z.email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Please enter a valid password.',
  }),
});

const SignUp = () => {
  const [passwordType, setPasswordType] = useState<string>('password');

  const form = useForm({
    defaultValues: {
      email: '',
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
      legend="Start managing your event guest lists"
      description="Enter your name and email to get started."
      formId="sign-up"
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
      <FormFooter showSubmitButton label="Continue">
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
