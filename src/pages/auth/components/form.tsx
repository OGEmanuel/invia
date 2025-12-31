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
import { Loader2 } from 'lucide-react';

type FormWrapperProps<TValues extends Record<string, any>> = {
  legend: React.ReactNode;
  description: React.ReactNode | string;
  children: React.ReactNode;
  formId: string;
  form: FormApi<TValues, any, any, any, any, any, any, any, any, any, any, any>;
};

const AuthFormWrapper = <TFormValues extends Record<string, any>>(
  props: FormWrapperProps<TFormValues>,
) => {
  const { formId, form, children, legend, description } = props;

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
        <FieldDescription className="text-base/6 font-normal tracking-[-0.02em] text-[#626262]">
          {description}
        </FieldDescription>
        <FieldGroup className="flex flex-col gap-4">{children}</FieldGroup>
      </FieldSet>
    </form>
  );
};

export default AuthFormWrapper;

export const FormFooter = (props: {
  children?: React.ReactNode;
  label?: string;
  className?: string;
  showSubmitButton?: boolean;
  isPending?: boolean;
}) => {
  const { children, className, label, showSubmitButton, isPending } = props;

  return (
    <FieldContent
      className={cn(
        'w-full flex-row items-center justify-between text-[#575554]',
        className,
      )}
    >
      {children}
      {showSubmitButton && (
        <Button
          type="submit"
          disabled={isPending}
          className={
            'grid-stack grid w-max gap-0 overflow-hidden disabled:cursor-not-allowed disabled:opacity-50'
          }
        >
          <span
            className={cn(
              'grid-area-stack visible translate-y-0 transition-all',
              isPending && 'invisible -translate-y-50',
              typeof label !== 'string' && 'flex items-center gap-2',
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              `grid-area-stack invisible flex w-full translate-y-50 justify-center transition-all`,
              isPending && 'visible translate-y-0',
            )}
          >
            <Loader2 aria-label="Loading" className="animate-spin" />
          </span>
        </Button>
      )}
    </FieldContent>
  );
};
