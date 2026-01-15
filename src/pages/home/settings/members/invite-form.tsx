import InputField from '@/components/ui/custom/input';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useForm } from '@tanstack/react-form';
import z from 'zod';

const formSchema = z.object({
  email: z.email({
    error: 'Please enter a valid email address.',
  }),
  role: z.string().min(2, {
    error: 'Please select a role.',
  }),
});

const ROLES = [
  {
    id: 'admin',
    title: 'Admin role',
    description:
      'Full access to manage events, guests, messages, members, and account settings.',
  },
  {
    id: 'member',
    title: 'Member role',
    description: 'Can manage events, guests, and messages with limited access.',
  },
];

const InviteForm = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;

  const form = useForm({
    defaultValues: {
      email: '',
      role: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      id={`invite-member-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn('flex h-[calc(100%-83px)] w-full flex-col', className)}
    >
      <FieldGroup className="h-[calc(100%-81px)] gap-6 p-4">
        <form.Field
          name="email"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <InputField
                field={field}
                isInvalid={isInvalid}
                label="Email address"
                placeholder="Email address"
              />
            );
          }}
        />
        <hr className="border border-y-[0.5px] border-dashed" />
        <form.Field
          name="role"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FieldSet>
                <RadioGroup
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  className="gap-0 overflow-hidden rounded-[12px] border border-black/8 bg-white"
                >
                  {ROLES.map(role => (
                    <FieldLabel
                      key={role.id}
                      htmlFor={`invite-member-form-${role.id}`}
                      className="border-0! first:border-b! first:border-black/8! has-data-[state=checked]:bg-[#FEFCF9] has-[>[data-slot=field]]:rounded-none"
                    >
                      <Field
                        orientation="horizontal"
                        data-invalid={isInvalid}
                        className="flex-row-reverse gap-2 overflow-hidden"
                      >
                        <FieldContent className="gap-0">
                          <FieldTitle className="text-sm/6 font-medium -tracking-[0.02em] text-[#212121]">
                            {role.title}
                          </FieldTitle>
                          <FieldDescription className="text-sm/6 -tracking-[0.02em] text-[#575554]">
                            {role.description}
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value={role.id}
                          id={`invite-member-form-${role.id}`}
                          aria-invalid={isInvalid}
                          className="size-5 bg-white shadow-none data-[state=checked]:border-[#479FFD] [&>span>svg]:fill-[#479FFD]"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </FieldSet>
            );
          }}
        />
      </FieldGroup>
      {children}
    </form>
  );
};

export default InviteForm;
