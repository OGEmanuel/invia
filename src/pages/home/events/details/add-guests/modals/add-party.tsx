import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/ui/custom/button-loading';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import DrawerContentWrapper from '@/components/ui/custom/drawer-content-wrapper';
import InputField from '@/components/ui/custom/input';
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { FieldSet } from '@/components/ui/field';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import { QUERY_KEYS } from '@/lib/queries/query-keys';
import { cn } from '@/lib/utils';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useParams } from '@tanstack/react-router';
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
  partyId?: string;
}) => {
  const [open, setOpen] = useState(false);
  const { children, partyId } = props;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContentWrapper
        title="Add event party"
        description="Configure your export settings to download."
        className="h-80"
      >
        <AddPartyForm
          partyId={partyId}
          onSetOpen={setOpen}
          className="h-[calc(100%-83px)]"
        />
      </DrawerContentWrapper>
    </Drawer>
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
  const { pathname } = useLocation();
  const { className, onSetOpen } = props;
  const { eventId } = useParams({
    from: pathname.includes('/share-guest-list')
      ? '/share-guest-list/$eventId'
      : '/_authenticated/$eventId',
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
      <DrawerFooter className="border-t border-[#00000014] p-4 max-sm:flex-row max-sm:justify-end sm:hidden">
        <DrawerClose asChild>
          <Button type="button" variant={'neutral'}>
            Cancel
          </Button>
        </DrawerClose>
        <ButtonLoading label="Create party" isPending={isPending} />
      </DrawerFooter>
    </form>
  );
};
