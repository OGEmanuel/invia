import Edit from '@/assets/jsx-icons/edit';
import { Button } from '@/components/ui/button';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import InputField from '@/components/ui/custom/input';
import SelectField from '@/components/ui/custom/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import PhoneField from '@/components/ui/custom/phone';
import Notice from '@/assets/jsx-icons/notice';
import SheetContentWrapper, {
  SheetFooterWrapper,
} from '@/components/ui/custom/sheet-content-wrapper';
import { Sheet } from '@/components/ui/sheet';

const GuestActions = (props: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}) => {
  const { children, className, asChild } = props;
  const [showEditGuestDialog, setShowEditGuestDialog] = useState(false);
  const [showRemoveGuestDialog, setShowRemoveGuestDialog] = useState(false);
  const [showEditGuestSheet, setShowEditGuestSheet] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className={cn('cursor-pointer', className)}
          asChild={asChild}
        >
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => setShowEditGuestDialog(true)}
            className="max-sm:hidden"
          >
            <Edit />
            Edit guest
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowEditGuestSheet(true)}
            className="sm:hidden"
          >
            <Edit />
            Edit guest
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setShowRemoveGuestDialog(true)}
          >
            <Trash2 />
            Remove guest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showEditGuestDialog} onOpenChange={setShowEditGuestDialog}>
        <DialogContentWrapper title="Edit Event" className="h-max">
          <EditGuestForm />
        </DialogContentWrapper>
      </Dialog>
      <Dialog
        open={showRemoveGuestDialog}
        onOpenChange={setShowRemoveGuestDialog}
      >
        <DialogContent className="flex max-w-88.25 flex-col gap-8 rounded-3xl px-4 pt-10 pb-4 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6">
          <DialogHeader className="sr-only">
            <DialogTitle>Remove this guest?</DialogTitle>
            <DialogDescription>
              Removing this guest will delete their details from this event and
              stop all future messages.
            </DialogDescription>
          </DialogHeader>
          <RemoveGuest />
          <DialogFooter className="flex-row justify-center sm:justify-center">
            <DialogClose asChild>
              <Button variant="neutral">Go back</Button>
            </DialogClose>
            <Button variant={'destructive'}>Remove guest</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Sheet open={showEditGuestSheet} onOpenChange={setShowEditGuestSheet}>
        <SheetContentWrapper
          title="Edit guest"
          setOpen={setShowEditGuestSheet}
          className="h-max"
        >
          <EditGuestForm className="h-[calc(100%-83px)]" />
        </SheetContentWrapper>
      </Sheet>
    </>
  );
};

export default GuestActions;

const formSchema = z.object({
  guestName: z.string().min(2, {
    message: 'Please enter a valid guest name.',
  }),
  party: z.string().min(2, {
    message: 'Please select a party',
  }),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: 'Please enter a valid WhatsApp number.',
    error: 'Please enter a valid WhatsApp number.',
  }),
  email: z.email().optional(),
});

type EditGuestFormType = z.infer<typeof formSchema>;

const spokenLanguages = [
  { label: 'Groom', value: 'groom' },
  { label: 'Bride', value: 'bride' },
  { label: 'Event Planner', value: 'planner' },
];

const EditGuestForm = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const { className } = props;

  const form = useForm({
    defaultValues: {
      guestName: '',
      party: '',
      whatsappNumber: '',
      email: undefined,
    } as EditGuestFormType,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      id={`edit-guest-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn('w-full p-0', className)}
    >
      <FieldGroup
        className={cn(
          'flex h-[calc(100%-81px)] flex-col justify-between gap-6 overflow-auto p-4',
        )}
      >
        <FieldSet className="items-end gap-6 sm:flex-row sm:gap-2">
          <form.Field
            name="guestName"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <InputField
                  field={field}
                  isInvalid={isInvalid}
                  label="Guest name"
                  placeholder="Mr & Mrs Williams’ Wedding"
                  wrapperClassName="basis-full"
                  className="h-10 w-full"
                />
              );
            }}
          />
          <form.Field
            name="party"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <SelectField
                  label="Party"
                  placeholder="Groom"
                  isInvalid={isInvalid}
                  field={field}
                  options={spokenLanguages}
                  wrapperClassName="sm:w-max"
                  className="h-10! w-full sm:w-41"
                />
              );
            }}
          />
        </FieldSet>
        <FieldSet className="gap-6 sm:flex-row sm:gap-2">
          <form.Field
            name="whatsappNumber"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <PhoneField
                  isInvalid={isInvalid}
                  field={field}
                  label="WhatsApp Number"
                  wrapperClassName="basis-full"
                />
              );
            }}
          />
          <form.Field
            name="email"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <InputField
                  field={field}
                  isInvalid={isInvalid}
                  label="Email"
                  placeholder="Enter email"
                  wrapperClassName="basis-full"
                  optional
                />
              );
            }}
          />
        </FieldSet>
      </FieldGroup>
      <DialogFooter className="flex-row justify-end border-t border-[#00000014] p-4 max-sm:hidden sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant={'neutral'}>
            Cancel
          </Button>
        </DialogClose>
        <Button type={'submit'}>Save changes</Button>
      </DialogFooter>
      <SheetFooterWrapper buttonLabel="Save changes" className="sm:hidden" />
    </form>
  );
};

const RemoveGuest = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-100 flex-col items-center gap-5 text-center">
        <Notice />
        <div className="flex flex-col gap-2 text-sm/[22px] -tracking-[0.02em] text-[#575554]">
          <p>Are you sure you want to remove</p>
          <h3 className="font-serif text-xl/7 text-[#212121]">
            Abolaji Olunuga
          </h3>
          <p>
            Removing this guest will delete their details from this event and
            stop all future messages.
          </p>
        </div>
      </div>
    </div>
  );
};
