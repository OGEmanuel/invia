import type { ComponentProps } from 'react';
import { Field, FieldError } from '../field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../input-otp';
import { cn } from '@/lib/utils';

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
}

const InputOTPField = <TValue = string,>(props: InputFieldProps<TValue>) => {
  const { field, isInvalid } = props;

  return (
    <Field data-invalid={isInvalid}>
      <InputOTP
        maxLength={6}
        id={field.name}
        name={field.name}
        value={field.state.value as string}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e as TValue)}
        aria-invalid={isInvalid}
      >
        <InputOTPGroup className={cn('w-full justify-center gap-3')}>
          <InputOTPGroup
            className={cn(
              'basis-full',
              !field.state.meta.isTouched && 'text-[#A3A19D]',
            )}
          >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPGroup className="basis-full">
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTPGroup>
      </InputOTP>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default InputOTPField;
