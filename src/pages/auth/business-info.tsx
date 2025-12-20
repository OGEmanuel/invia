import { useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputField from '@/components/ui/custom/input';
import { FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import AvatarCustom from '@/components/ui/custom/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  image: z
    .union([
      z.url('Must be a valid URL'),
      z
        .any()
        .refine(
          file =>
            !file ||
            (file instanceof File &&
              file.size <= 10 * 1024 * 1024 &&
              file.type.startsWith('image/')),
          { message: 'Please upload an image file not more than 10MB.' },
        ),
    ])
    .optional(),
  businessName: z.string().min(2, {
    message: 'Please enter a valid business name.',
  }),
});

type BusinessInfoFormValues = z.infer<typeof formSchema>;

const BusinessInfo = () => {
  const form = useForm({
    defaultValues: {
      image: null as any,
      businessName: '',
    } as BusinessInfoFormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <AuthFormWrapper
      legend="Customize your planner profile"
      description="Add your business name and logo for your invitations."
      formId="business-info"
      form={form}
    >
      <form.Field
        name="businessName"
        children={field => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <FieldSet className="flex-row items-center gap-4">
              <AvatarCustom
                src={''}
                alt={''}
                fallback={'A'}
                className="font-inter size-18 border border-[#00000014] text-[40px]/[100%] font-semibold tracking-[-0.02em] text-white shadow-none"
              />
              <FieldLabel
                htmlFor={field.name}
                className="font-inter relative flex-col gap-2 text-base/6 font-medium tracking-tight text-[#212121]"
              >
                <span className="absolute inset-0"></span>
                Business logo
                <Button
                  type="button"
                  className="h-9 border border-[#00000014] bg-transparent text-base/6 font-medium tracking-[-0.02em] text-[#575554] hover:bg-transparent"
                >
                  Add image
                </Button>
                {/* Don't forget to set this up: Remove image */}
                <Input
                  id={field.name}
                  name={field.name}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onBlur={field.handleBlur}
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (
                      file &&
                      file.type.startsWith('image/') &&
                      file.size <= 10 * 1024 * 1024
                    ) {
                      field.handleChange(file as any);
                    }
                  }}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
              </FieldLabel>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </FieldSet>
          );
        }}
      />
      <form.Field
        name="businessName"
        children={field => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <InputField
              field={field}
              isInvalid={isInvalid}
              label="Business name"
              placeholder="Enter your business name"
            />
          );
        }}
      />
      <FormFooter showSubmitButton label="Sign in" className="justify-end" />
    </AuthFormWrapper>
  );
};

export default BusinessInfo;
