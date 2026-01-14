import { Button } from '@/components/ui/button';
import AvatarCustom from '@/components/ui/custom/avatar';
import { FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { useField, useForm } from '@tanstack/react-form';
import z from 'zod';

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
});

type AccountImageUploadType = z.infer<typeof formSchema>;

const EditBusinessLogo = () => {
  const form = useForm({
    defaultValues: {
      image: null as any,
    } as AccountImageUploadType,
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

  const image = useField({
    name: 'image',
    form,
  });

  return (
    <form.Field
      name="image"
      children={field => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        return (
          <FieldSet className="flex-row items-center gap-4">
            {isUploadingImage ? (
              <div className="size-22 animate-pulse rounded-full bg-gray-300"></div>
            ) : (
              <AvatarCustom
                src={image.state.value}
                alt={'Business logo'}
                fallback={'A'}
                className="relative size-22 text-[40px]/[100%] font-semibold tracking-[-0.02em] before:absolute before:inset-0 before:top-1/2 before:left-1/2 before:size-full before:-translate-1/2 before:rounded-full before:border before:border-[#00000014]"
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
                  className="h-10 border border-[#00000014] bg-transparent px-3! text-base/6 font-medium tracking-[-0.02em] text-[#575554] hover:bg-transparent"
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
  );
};

export default EditBusinessLogo;
