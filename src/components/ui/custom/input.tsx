import { cn } from '@/lib/utils';
import { Field, FieldError, FieldLabel, FieldSet } from '../field';
import { Input } from '../input';
import type { ComponentProps } from 'react';

type FormFieldApi<TValue> = {
  name: string;
  state: {
    value: TValue;
    meta: {
      isTouched: boolean;
      isValid: boolean;
      errors: ({ message?: string | undefined } | undefined)[];
    };
  };
  handleBlur: () => void;
  handleChange: (value: TValue) => void;
};

interface InputFieldProps<TValue = string> extends ComponentProps<'input'> {
  field: FormFieldApi<TValue>;
  isInvalid?: boolean;
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  optional?: boolean;
}

const InputField = <TValue = string,>(props: InputFieldProps<TValue>) => {
  const {
    field,
    label,
    placeholder,
    className,
    isInvalid,
    type = 'text',
    icon,
    iconPosition,
    optional,
  } = props;

  return (
    <Field data-invalid={isInvalid} className="gap-1.5">
      <FieldSet className="flex-row items-center justify-between">
        <FieldLabel
          htmlFor={field.name}
          className="text-sm/5 font-medium tracking-tight text-[#575554]"
        >
          {label}
        </FieldLabel>
        {optional && (
          <span className="text-sm/5 -tracking-[0.02em] text-[#A3A19D]">
            Optional
          </span>
        )}
      </FieldSet>
      <FieldSet className="relative">
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value as string}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value as TValue)}
          aria-invalid={isInvalid}
          placeholder={placeholder}
          type={type}
          className={cn(
            'h-11 rounded-[12px] border border-[#00000014] text-sm/6 tracking-[-0.02em] shadow-none placeholder:text-[#A3A19D]',
            className,
            iconPosition === 'left' && 'pl-10.5',
          )}
        />
        <span
          className={cn(
            'absolute flex items-center',
            iconPosition === 'left'
              ? 'top-1/2 left-3.5 -translate-y-1/2'
              : 'top-1/2 right-3.5 -translate-y-1/2',
          )}
        >
          {icon}
        </span>
      </FieldSet>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default InputField;
