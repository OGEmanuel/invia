import { cn } from '@/lib/utils';
import { Field, FieldError, FieldLabel, FieldSet } from '../field';
import type { ComponentProps } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  // SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../select';
import type { FormFieldApi } from '@/lib/constants';

interface SelectFieldProps extends ComponentProps<'select'> {
  field: FormFieldApi<string>;
  isInvalid?: boolean;
  label?: string;
  optional?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
  orientation?: 'vertical' | 'horizontal' | 'responsive' | null;
  wrapperClassName?: string;
  children?: React.ReactNode;
  errorClassName?: string;
}

const SelectField = (props: SelectFieldProps) => {
  const {
    field,
    label,
    placeholder,
    className,
    isInvalid,
    optional,
    options,
    orientation = 'vertical',
    wrapperClassName,
    children,
    errorClassName,
  } = props;

  return (
    <Field
      data-invalid={isInvalid}
      orientation={orientation}
      className={cn('gap-1.5', wrapperClassName)}
    >
      {label && (
        <FieldSet className="flex-row items-center justify-between">
          {label && (
            <FieldLabel
              htmlFor={field.name}
              className="text-sm/5 font-medium tracking-tight text-[#575554]"
            >
              {label}
            </FieldLabel>
          )}
          {optional && (
            <span className="text-sm/5 -tracking-[0.02em] text-[#A3A19D]">
              Optional
            </span>
          )}
        </FieldSet>
      )}
      <FieldSet className="relative">
        <Select
          name={field.name}
          value={field.state.value as string}
          onValueChange={(value: string) => field.handleChange(value)}
        >
          <SelectTrigger
            id={field.name}
            aria-invalid={isInvalid}
            className={cn(
              'h-11! rounded-[12px] border border-[#00000014] text-sm/6 tracking-[-0.02em] shadow-none placeholder:text-[#A3A19D]',
              className,
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent position="item-aligned" className="z-999">
            {/* <SelectItem value="auto">Auto</SelectItem>
            <SelectSeparator /> */}
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldSet>
      {children}
      {isInvalid && (
        <FieldError
          className={cn(errorClassName)}
          errors={field.state.meta.errors}
        />
      )}
    </Field>
  );
};

export default SelectField;
