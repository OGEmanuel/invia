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
  form: FormApi<TValues, any, any, any, any, any, any, any, any, any, any, any>;
};

const AuthFormWrapper = <TFormValues extends Record<string, any>>(
  props: FormWrapperProps<TFormValues>,
) => {
  const { formId, form, children, legend, description, label } = props;

  return (
    <form
      id={`${formId}-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex w-full max-w-100"
    >
      <FieldSet>
        <FieldLegend className="font-serif text-2xl/8 font-normal text-[#212121]">
          {legend}
        </FieldLegend>
        <FieldDescription className="font-inter text-base/[100%] font-normal text-[#626262]">
          {description}
        </FieldDescription>
        <FieldGroup className="flex flex-col gap-4">
          {children}
          <FieldContent
            className={cn(
              'w-full flex-row items-center justify-between',
              formId === 'login' ? 'justify-between' : 'justify-end',
            )}
          >
            <Activity mode={formId === 'login' ? 'visible' : 'hidden'}>
              <Link
                to={'/'}
                className="font-inter leading-[100%] tracking-[-0.02em] text-[#626262]"
              >
                Forgot password?
              </Link>
            </Activity>
            <Button className="w-max">{label}</Button>
          </FieldContent>
          {/* <Button
            disabled={isPending}
            className={cn(
              'relative col-span-2 overflow-hidden disabled:cursor-not-allowed disabled:opacity-50 max-md:mt-6',
              notify && 'bg-transparent hover:bg-transparent',
            )}
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <>
                <span
                  className={cn(
                    'absolute inset-0 flex translate-y-0 items-center justify-center transition-transform duration-100 ease-out',
                    notify && 'translate-y-full',
                  )}
                >
                  {label}
                </span>

                <span
                  className={cn(
                    'absolute inset-0 flex -translate-y-full items-center justify-center bg-[#56DCDF26] transition-transform duration-100 ease-out',
                    notify && 'translate-y-0',
                  )}
                >
                  Sent!
                </span>
              </>
            )}
          </Button> */}
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default AuthFormWrapper;
