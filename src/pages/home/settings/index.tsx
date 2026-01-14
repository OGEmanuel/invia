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

const Account = () => {
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
    <section className="flex flex-col gap-8">
      <h1 className="font-serif text-2xl/8 text-[#212121]">Account</h1>
      <div className="flex flex-col gap-8">
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
        <ProfileCard name="Business name" value="Abolaji Events Limited">
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#212121]">
            Edit
          </p>
        </ProfileCard>
        <hr className="border-y-[0.5px] border-[#00000014]" />
        <div className="flex flex-col gap-4">
          <ProfileCard name="Name" value="Abolaji Olunuga">
            <p className="text-sm/[22px] -tracking-[0.02em] text-[#212121]">
              Edit
            </p>
          </ProfileCard>
          <hr className="border-y-[0.5px] border-dashed border-[#00000014]" />
          <ProfileCard name="Email address" value="bojnuga.empire@gmail.com">
            <p className="text-sm/[22px] -tracking-[0.02em] text-[#212121]">
              Edit
            </p>
          </ProfileCard>
          <hr className="border-y-[0.5px] border-dashed border-[#00000014]" />
          <ProfileCard name="Password" value="**********">
            <p className="text-sm/[22px] -tracking-[0.02em] text-[#6155F5]">
              Change password
            </p>
          </ProfileCard>
        </div>
        <hr className="border-y-[0.5px] border-[#00000014]" />
        <ProfileCard
          name="Permanently delete your invia account."
          value="Delete account"
          className="items-center [&>div]:flex-col-reverse"
        >
          <Button
            variant={'neutral'}
            className="border-destructive/10 text-destructive h-10"
          >
            Delete
          </Button>
        </ProfileCard>
      </div>
    </section>
  );
};

export default Account;

const ProfileCard = (props: {
  children: React.ReactNode;
  className?: string;
  name: string;
  value: string;
}) => {
  const { children, className, name, value } = props;
  return (
    <div className={cn('flex items-end justify-between', className)}>
      <div className="flex flex-col gap-2">
        <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
          {name}
        </p>
        <p className="leading-6 font-medium -tracking-[0.02em] text-[#212121]">
          {value}
        </p>
      </div>
      {children}
    </div>
  );
};
