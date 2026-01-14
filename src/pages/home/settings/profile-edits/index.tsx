import EyeClosed from '@/assets/jsx-icons/eye-closed';
import EyeOpened from '@/assets/jsx-icons/eye-opened';
import InputField from '@/components/ui/custom/input';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import z from 'zod';
import email from '@/assets/icons/confirm-email.svg';
import { cn } from '@/lib/utils';

const editBusinessNameSchema = z.object({
  businessName: z.string().min(2, {
    error: 'Please enter a valid business name.',
  }),
});

export const EditBusinessNameForm = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;

  const form = useForm({
    defaultValues: {
      businessName: '',
    },
    validators: {
      onSubmit: editBusinessNameSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      id={`edit-business-name-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn('flex w-full flex-col', className)}
    >
      <form.Field
        name="businessName"
        children={field => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <InputField
              field={field}
              isInvalid={isInvalid}
              label="Business name"
              placeholder="Business name"
              wrapperClassName="px-4 pt-2 pb-6"
            />
          );
        }}
      />
      {children}
    </form>
  );
};

const editNameSchema = z.object({
  name: z.string().min(2, {
    error: 'Please enter a valid name.',
  }),
});

export const EditNameForm = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;
  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onSubmit: editNameSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      id={`edit-name-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn('flex w-full flex-col', className)}
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
              placeholder="Name"
              wrapperClassName="px-4 pt-2 pb-6"
            />
          );
        }}
      />
      {children}
    </form>
  );
};

const editEmailSchema = z.object({
  email: z.email({
    error: 'Please enter a valid email address.',
  }),
});

export const EditEmailForm = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: editEmailSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      id={`edit-email-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn('flex w-full flex-col', className)}
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
              placeholder="Email address"
              wrapperClassName="px-4 pt-2 pb-6"
            />
          );
        }}
      />
      {children}
    </form>
  );
};

const editPasswordSchema = z.object({
  password: z.string().min(6, {
    error: 'Please enter a valid password.',
  }),
});

export const EditPasswordForm = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;
  const [passwordType, setPasswordType] = useState<string>('password');

  const handlePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const form = useForm({
    defaultValues: {
      password: '',
    },
    validators: {
      onSubmit: editPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      id={`edit-password-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn('flex w-full flex-col', className)}
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
              type="password"
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
              wrapperClassName="px-4 pt-2 pb-6"
            />
          );
        }}
      />
      {children}
    </form>
  );
};

export const ConfirmEmail = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-100">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-20 w-30">
            <img src={email} alt={'Confirm email'} />
          </div>
          <div>
            <h3 className="font-serif text-xl/7 text-[#212121]">
              Confirm your new email address
            </h3>
            <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
              {`We’ve`} sent a confirmation link to your new email. Click the
              link to complete the update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileCard = (props: {
  children: React.ReactNode;
  className?: string;
  name: string;
  value: string;
}) => {
  const { children, className, name, value } = props;
  return (
    <div className={cn('flex items-end justify-between', className)}>
      <div className="flex flex-col gap-2">
        <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
          {name}
        </p>
        <p className="leading-6 font-medium -tracking-[0.02em] text-[#212121]">
          {value}
        </p>
      </div>
      {children}
    </div>
  );
};
