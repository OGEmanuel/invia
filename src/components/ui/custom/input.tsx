import { cn } from '@/lib/utils';
import { Field, FieldError, FieldLabel, FieldSet } from '../field';
import { Input } from '../input';
import { Activity, type ComponentProps } from 'react';
import type { FormFieldApi } from '@/lib/constants';

interface InputFieldProps<TValue = string> extends ComponentProps<'input'> {
  field: FormFieldApi<TValue>;
  isInvalid?: boolean;
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  optional?: boolean;
  orientation?: 'vertical' | 'horizontal' | 'responsive' | null;
  wrapperClassName?: string;
  errorClassName?: string;
  numberOnly?: boolean;
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
    orientation = 'vertical',
    wrapperClassName,
    errorClassName,
    numberOnly,
  } = props;

  return (
    <Field
      data-invalid={isInvalid}
      orientation={orientation}
      className={cn('gap-1.5', wrapperClassName)}
    >
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
        <Activity mode={numberOnly ? 'hidden' : 'visible'}>
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
        </Activity>
        <Activity mode={numberOnly ? 'visible' : 'hidden'}>
          <Input
            id={field.name}
            name={field.name}
            value={field.state.value as string}
            onBlur={field.handleBlur}
            onChange={e => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              field.handleChange(value as TValue);
            }}
            aria-invalid={isInvalid}
            placeholder={placeholder}
            type={type}
            className={cn(
              'h-11 rounded-[12px] border border-[#00000014] text-sm/6 tracking-[-0.02em] shadow-none placeholder:text-[#A3A19D]',
              className,
              iconPosition === 'left' && 'pl-10.5',
            )}
          />
        </Activity>
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
      {isInvalid && (
        <FieldError
          className={cn(errorClassName)}
          errors={field.state.meta.errors}
        />
      )}
    </Field>
  );
};

export default InputField;
