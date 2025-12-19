import LoadingSpinner from '@/assets/jsx-icons/loading-spinner';
import { Button } from '@/components/ui/button';
import {
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { FormApi } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import { Activity } from 'react';

type FormWrapperProps<TValues extends Record<string, any>> = {
  legend: React.ReactNode;
  description: React.ReactNode | string;
  children: React.ReactNode;
  label: string;
  formId: string;
  isPending?: boolean;
  isSuccess?: boolean;
  resendCode?: boolean;
  resendCodeIsPending?: boolean;
  showSubmitButton?: boolean;
  form: FormApi<TValues, any, any, any, any, any, any, any, any, any, any, any>;
};

const AuthFormWrapper = <TFormValues extends Record<string, any>>(
  props: FormWrapperProps<TFormValues>,
) => {
  const {
    formId,
    form,
    children,
    legend,
    description,
    label,
    resendCode,
    resendCodeIsPending,
    showSubmitButton = true,
  } = props;

  return (
    <form
      id={`${formId}-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex w-full"
    >
      <FieldSet className="w-full">
        <FieldLegend className="font-serif text-2xl/8! font-normal text-[#212121]">
          {legend}
        </FieldLegend>
        <FieldDescription className="font-inter text-base/[100%] font-normal tracking-[-0.02em] text-[#626262]">
          {description}
        </FieldDescription>
        <FieldGroup className="flex flex-col gap-4">
          {children}
          <FieldContent
            className={cn(
              'w-full flex-row items-center',
              formId === 'login' ? 'justify-between' : 'justify-end',
              formId === 'verify-reset-password' ||
                (formId === 'verify-email' && resendCode && 'justify-start'),
              formId === 'verify-reset-password' ||
                (formId === 'verify-email' &&
                  resendCodeIsPending &&
                  'justify-between'),
            )}
          >
            <Activity mode={formId === 'login' ? 'visible' : 'hidden'}>
              <Link
                to={'/auth/forgot-password'}
                className="font-inter leading-[100%] tracking-[-0.02em] text-[#626262]"
              >
                Forgot password?
              </Link>
            </Activity>
            {formId === 'verify-reset-password' ||
              (formId === 'verify-email' && (
                <>
                  <button
                    type="button"
                    className={cn(
                      'font-inter cursor-pointer tracking-[-0.02em] text-[#A3A19D]',
                      resendCode && 'text-[#6155F5]',
                    )}
                  >
                    {resendCode ? 'Resend Code' : 'Resend code in 15s'}
                  </button>
                  {resendCodeIsPending && (
                    <LoadingSpinner className="animate-spin" />
                  )}
                </>
              ))}
            {showSubmitButton && <Button className="w-max">{label}</Button>}
          </FieldContent>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default AuthFormWrapper;
