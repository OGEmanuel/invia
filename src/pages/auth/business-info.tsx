import { useField, useForm } from '@tanstack/react-form';
import AuthFormWrapper, { FormFooter } from './components/form';
import { z } from 'zod';
import InputField from '@/components/ui/custom/input';
import { FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import AvatarCustom from '@/components/ui/custom/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import { cn } from '@/lib/utils';
import type { AccountInfo } from '@/lib/constants';
import { useNavigate } from '@tanstack/react-router';

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
          { error: 'Please upload an image file not more than 10MB.' },
        ),
    ])
    .optional(),
  businessName: z.string().min(2, {
    error: 'Please enter a valid business name.',
  }),
});

type BusinessInfoFormValues = z.infer<typeof formSchema>;

const BusinessInfo = () => {
  const navigate = useNavigate({ from: '/auth/business-info' });

  const { mutate, isPending } = useSendRequest<
    { businessName: string; businessAvatar: string },
    { data: AccountInfo }
  >({
    mutationFn: (data: { businessName: string; businessAvatar: string }) =>
      MUTATIONS.authInitializeBusinessProfile(data),
    successToast: {
      title: 'Success!',
      description: 'Profile created successfully.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: () => {
      navigate({
        to: '/',
        search: {
          page: 1,
          limit: 12,
        },
      });
    },
  });

  const form = useForm({
    defaultValues: {
      image: null as any,
      businessName: '',
    } as BusinessInfoFormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      mutate({
        businessName: value.businessName,
        businessAvatar: value.image,
      });
    },
  });

  const image = useField({
    name: 'image',
    form,
  });

  const { mutate: uploadImage, isPending: isUploadingImage } = useSendRequest<
    { file: File },
    { data: { url: string } }
  >({
    mutationFn: (data: { file: File }) =>
      MUTATIONS.authUploadFileCloudinary(data, data.file.name),
    successToast: {
      title: 'Success!',
      description: 'Photo uploaded successfully.',
    },
    errorToast: {
      title: 'Upload failed!',
      description: 'Please try again.',
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
        name="image"
        children={field => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <FieldSet className="flex-row items-center gap-4">
              {isUploadingImage ? (
                <div className="size-18 animate-pulse rounded-full bg-gray-300"></div>
              ) : (
                <AvatarCustom
                  src={image.state.value}
                  alt={'Business logo'}
                  fallback={'B'}
                  className="relative size-18 text-[40px]/[100%] font-semibold tracking-[-0.02em] before:absolute before:inset-0 before:top-1/2 before:left-1/2 before:size-full before:-translate-1/2 before:rounded-full before:border before:border-[#00000014]"
                />
              )}
              <FieldSet className="flex-row items-end gap-1">
                <FieldLabel
                  htmlFor={field.name}
                  className={cn(
                    'relative flex-col gap-2 text-base/6 font-medium tracking-tight text-[#212121]',
                    isUploadingImage && 'pointer-events-none',
                  )}
                >
                  <span
                    className={cn(
                      'absolute inset-0',
                      isUploadingImage && 'pointer-events-none',
                    )}
                  ></span>
                  Business logo
                  <Button
                    type="button"
                    disabled={isUploadingImage}
                    className="h-9 border border-[#00000014] bg-transparent text-base/6 font-medium tracking-[-0.02em] text-[#575554] hover:bg-transparent"
                  >
                    {isUploadingImage
                      ? 'Uploading...'
                      : field.state.value
                        ? 'Change image'
                        : 'Add image'}
                  </Button>
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
                        uploadImage(
                          {
                            file: file as any,
                          },
                          {
                            onSuccess: (data?: { data: { url: string } }) => {
                              field.handleChange(data?.data.url!!);
                            },
                          },
                        );
                      }
                    }}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                </FieldLabel>
                {field.state.value && (
                  <Button
                    onClick={() => field.handleChange(null)}
                    type="button"
                    className="text-destructive h-9 bg-transparent hover:bg-transparent"
                  >
                    Remove Image
                  </Button>
                )}
              </FieldSet>
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
      <FormFooter
        isPending={isPending}
        showSubmitButton
        label="Sign in"
        className="justify-end"
      />
    </AuthFormWrapper>
  );
};

export default BusinessInfo;
