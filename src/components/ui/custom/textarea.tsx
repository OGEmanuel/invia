import { cn } from '@/lib/utils';
import { Field, FieldError, FieldLabel, FieldSet } from '../field';
import { Activity, useRef, type ComponentProps } from 'react';
import type { FormFieldApi } from '@/lib/constants';
import { Textarea } from '../textarea';
import { Button } from '../button';
import { Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';

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
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
        {/* {insertVariable && ( */}
        <Activity mode={insertVariable ? 'visible' : 'hidden'}>
          <VariableDropdown field={field} inputRef={inputRef}>
            <Button
              type="button"
              className="h-8! rounded-[8px] border border-dashed border-[#6155F5]/10 bg-[#6155F5]/5 text-sm/[22px] font-medium text-[#6155f5] hover:bg-[#6155F5]/2"
            >
              <Plus className="size-4 text-[#6155F5]" />
              Insert variable
            </Button>
          </VariableDropdown>
        </Activity>
        {/* )} */}
      </FieldSet>
      <FieldSet className="relative">
        <Textarea
          ref={inputRef}
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

const insertAtCursor = <TValue = string,>(
  text: string,
  field: FormFieldApi<TValue>,
  inputRef: React.RefObject<HTMLTextAreaElement | null>,
  convertTextToValue?: (text: string) => TValue,
) => {
  const input = inputRef.current;
  if (!input) return;

  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? 0;
  const value = field.state.value ?? '';

  const newValueString =
    String(value).slice(0, start) + text + String(value).slice(end);

  const finalValue = convertTextToValue
    ? convertTextToValue(newValueString)
    : (newValueString as TValue);

  field.handleChange(finalValue);

  requestAnimationFrame(() => {
    const cursor = start + text.length;
    input.setSelectionRange(cursor, cursor);
  });
};

const VariableDropdown = <TValue = string,>(props: {
  children: React.ReactNode;
  field: FormFieldApi<TValue>;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}) => {
  const { children, field, inputRef } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-999">
        <DropdownMenuItem
          className="text-sm"
          onSelect={() => insertAtCursor('{event_name}', field, inputRef)}
        >
          Event Name
        </DropdownMenuItem>
        <DropdownMenuItem className="text-sm">Guest Name</DropdownMenuItem>
        <DropdownMenuItem className="text-sm">Event Type</DropdownMenuItem>
        <DropdownMenuItem className="text-sm">Event Location</DropdownMenuItem>
        <DropdownMenuItem className="text-sm">Event Date</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
