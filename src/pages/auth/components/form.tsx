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
        <FieldDescription className="font-inter text-base/6 font-normal tracking-[-0.02em] text-[#626262]">
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
}) => {
  const { children, className, label, showSubmitButton } = props;

  return (
    <FieldContent
      className={cn(
        'font-inter w-full flex-row items-center justify-between text-[#575554]',
        className,
      )}
    >
      {children}
      {showSubmitButton && <Button className={'w-max'}>{label}</Button>}
    </FieldContent>
  );
};
