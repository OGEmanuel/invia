import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/ui/custom/button-loading';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import InputField from '@/components/ui/custom/input';
import SheetContentWrapper from '@/components/ui/custom/sheet-content-wrapper';
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FieldSet } from '@/components/ui/field';
import {
  Sheet,
  SheetClose,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import { QUERY_KEYS } from '@/lib/queries/query-keys';
import { cn } from '@/lib/utils';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod';

export const AddParty = (props: {
  children?: React.ReactNode;
  asChild?: boolean;
  partyId?: string;
}) => {
  const { children, asChild = true, partyId } = props;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContentWrapper
        title="Add event party"
        description="Configure your export settings to download."
        className="h-80"
      >
        <AddPartyForm
          partyId={partyId}
          onSetOpen={setOpen}
          className="h-[calc(100%-83px)]"
        />
      </DialogContentWrapper>
    </Dialog>
  );
};

export const AddPartyMobileSheet = (props: {
  children?: React.ReactNode;
  open: boolean;
  onSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  partyId?: string;
}) => {
  const { children, open, onSetOpen, partyId } = props;

  return (
    <Sheet open={open} onOpenChange={onSetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContentWrapper
        title="Add event party"
        description="Configure your export settings to download."
        setOpen={onSetOpen}
        className="h-80"
      >
        <AddPartyForm
          partyId={partyId}
          onSetOpen={onSetOpen}
          className="h-[calc(100%-83px)]"
        />
      </SheetContentWrapper>
    </Sheet>
  );
};

const addPartyFormSchema = z.object({
  partyName: z.string().min(2, {
    error: 'Please enter a valid party name.',
  }),
});

const AddPartyForm = (props: {
  className?: string;
  children?: React.ReactNode;
  onSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  partyId?: string;
}) => {
  const { className, onSetOpen } = props;
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useSendRequest<{ name: string }, any>({
    mutationFn: (data: { name: string }) =>
      MUTATIONS.createParty(data, eventId),
    successToast: {
      title: 'Success!',
      description: 'Party created successfully.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: async () => {
      form.reset();
      onSetOpen(false);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.events.parties(eventId),
      });
    },
  });

  const form = useForm({
    defaultValues: {
      partyName: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: addPartyFormSchema,
    },
    onSubmit: async ({ value }) => {
      mutate({
        name: value.partyName,
      });
    },
  });

  return (
    <form
      id={`add-party-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn('flex flex-col justify-between gap-6', className)}
    >
      <FieldSet className="p-4">
        <form.Field
          name={`partyName`}
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <InputField
                field={field}
                isInvalid={isInvalid}
                label="Party name"
                placeholder="Guest, friends, family, etc."
                wrapperClassName="relative basis-full"
              />
            );
          }}
        />
      </FieldSet>
      <DialogFooter className="border-t border-[#00000014] p-4 max-sm:hidden">
        <DialogClose asChild>
          <Button type="button" variant={'neutral'}>
            Cancel
          </Button>
        </DialogClose>
        <ButtonLoading label="Create party" isPending={isPending} />
      </DialogFooter>
      <SheetFooter className="border-t border-[#00000014] p-4 max-sm:flex-row max-sm:justify-end sm:hidden">
        <SheetClose asChild>
          <Button type="button" variant={'neutral'}>
            Cancel
          </Button>
        </SheetClose>
        <ButtonLoading label="Create party" isPending={isPending} />
      </SheetFooter>
    </form>
  );
};
