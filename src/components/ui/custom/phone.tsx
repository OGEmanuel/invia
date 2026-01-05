import { cn } from '@/lib/utils';
import { Field, FieldError, FieldLabel, FieldSet } from '../field';
import type { ComponentProps } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import type { FormFieldApi } from '@/lib/constants';

interface PhoneFieldProps extends ComponentProps<'input'> {
  field: FormFieldApi<string>;
  isInvalid?: boolean;
  label: string;
  optional?: boolean;
  placeholder?: string;
  orientation?: 'vertical' | 'horizontal' | 'responsive' | null;
  wrapperClassName?: string;
  errorClassName?: string;
}

const PhoneField = (props: PhoneFieldProps) => {
  const {
    field,
    label,
    isInvalid,
    optional,
    orientation = 'vertical',
    wrapperClassName,
    errorClassName,
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
      <PhoneInput
        international
        defaultCountry="NG"
        value={field.state.value as string}
        onChange={value => field.handleChange(value as string)}
        onBlur={field.handleBlur}
        className="phone-input h-11 rounded-[12px] border border-[#00000014] px-3.5 text-sm/6 tracking-[-0.02em] shadow-none placeholder:text-[#A3A19D] [&>input]:h-full [&>input]:focus:outline-none"
      />
      {isInvalid && (
        <FieldError
          className={cn(errorClassName)}
          errors={field.state.meta.errors}
        />
      )}
    </Field>
  );
};

export default PhoneField;
