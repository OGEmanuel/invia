import { cn } from '@/lib/utils';
import { Field, FieldError, FieldLabel, FieldSet } from '../field';
import type { ComponentProps } from 'react';
import type { FormFieldApi } from '@/lib/constants';
import { Textarea } from '../textarea';
import { Button } from '../button';
import { Plus } from 'lucide-react';

interface TextareaFieldProps<
  TValue = string,
> extends ComponentProps<'textarea'> {
  field: FormFieldApi<TValue>;
  isInvalid?: boolean;
  label: string;
  insertVariable?: boolean;
  orientation?: 'vertical' | 'horizontal' | 'responsive' | null;
  wrapperClassName?: string;
}

const TextareaField = <TValue = string,>(props: TextareaFieldProps<TValue>) => {
  const {
    field,
    label,
    placeholder,
    className,
    isInvalid,
    insertVariable,
    orientation = 'vertical',
    wrapperClassName,
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
        {insertVariable && (
          <Button className="h-8! border border-dashed border-[#6155F5]/10 bg-[#6155F5]/5 text-[#6155f5] hover:bg-[#6155F5]/2">
            <Plus className="text-[#6155F5]" />
            Insert variable
          </Button>
        )}
      </FieldSet>
      <FieldSet className="relative">
        <Textarea
          id={field.name}
          name={field.name}
          value={field.state.value as string}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value as TValue)}
          aria-invalid={isInvalid}
          placeholder={placeholder || ''}
          className={cn(
            'min-h-22 resize-y rounded-[12px] border border-[#00000014] text-sm/6 tracking-[-0.02em] shadow-none placeholder:text-[#A3A19D]',
            className,
          )}
        />
      </FieldSet>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default TextareaField;
