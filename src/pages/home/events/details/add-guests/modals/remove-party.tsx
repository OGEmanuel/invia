import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/ui/custom/button-loading';
// import SelectField from '@/components/ui/custom/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
// import {
//   FieldDescription,
//   FieldGroup,
//   FieldLegend,
//   FieldSet,
// } from '@/components/ui/field';
import type { Party } from '@/lib/constants';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import { QUERY_KEYS } from '@/lib/queries/query-keys';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useState } from 'react';
import notice from '@/assets/icons/notice.svg';
// import { revalidateLogic, useForm } from '@tanstack/react-form';
// import z from 'zod';

export const RemovePartyDialog = (props: {
  children?: React.ReactNode;
  party: Party;
}) => {
  const { children, party } = props;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-w-88.25 flex-col gap-8 rounded-3xl px-4 pt-10 pb-4 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6">
        <DialogHeader className="sr-only">
          <DialogTitle>Remove this party?</DialogTitle>
          <DialogDescription>
            Removing this party will not delete the event, but guests assigned
            to this party will no longer be grouped under it.
          </DialogDescription>
        </DialogHeader>
        <RemoveParty
          partyId={party.id}
          partyName={party.name}
          setOpen={setOpen}
        />
        {/* <DialogFooter className="flex-row justify-center sm:justify-center">
          <DialogClose asChild>
            <Button variant="neutral">Go back</Button>
          </DialogClose>
          <Button variant={'destructive'}>Remove party</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

// const formSchema = z.object({
//   party: z.string().min(2, {
//     error: 'Please select a party',
//   }),
// });

const RemoveParty = (props: {
  partyName: string;
  emptyParty?: boolean;
  partyId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { partyName, partyId, setOpen } = props;
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useSendRequest<
    { partyId: string; eventId: string },
    any
  >({
    mutationFn: (data: { partyId: string; eventId: string }) =>
      MUTATIONS.deleteParty(data.partyId, data.eventId),
    successToast: {
      title: 'Success!',
      description: 'Party removed successfully.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: async () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.events.parties(eventId),
      });
      setOpen(false);
    },
  });

  // const form = useForm({
  //   defaultValues: {
  //     party: '',
  //   },
  //   validationLogic: revalidateLogic(),
  //   validators: {
  //     onSubmit: formSchema,
  //   },
  //   onSubmit: async ({ value }) => {
  //     console.log(value);
  //     console.log(emptyParty);
  //   },
  // });

  const handleRemoveParty = () => {
    mutate({
      partyId: partyId,
      eventId: eventId,
    });
  };

  return (
    <form
      id={`remove-party-form`}
      // onSubmit={e => {
      //   e.preventDefault();
      //   form.handleSubmit();
      // }}
      className={'flex flex-col items-center gap-6'}
    >
      <div className="flex w-full max-w-100 flex-col gap-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <img src={notice} alt="notice-icon" />
          <div className="flex flex-col gap-2 text-sm/[22px] -tracking-[0.02em] text-[#575554]">
            <p>Are you sure you want to remove</p>
            <h3 className="font-serif text-xl/7 text-[#212121]">{partyName}</h3>
            <p>
              Removing this party will not delete the event, but guests assigned
              to this party will no longer be grouped under it.
            </p>
          </div>
        </div>
        {/* <hr className="border-y-[0.5px] border-black/8" /> */}
        {/* <FieldGroup className="flex flex-col gap-3">
          <FieldSet>
            <FieldLegend className="text-sm/[22px] -tracking-[0.02em] text-[#212121]">
              Move (24) guests
            </FieldLegend>
            <FieldDescription className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
              Guests in this party need to be moved to another party before it
              can be removed.
            </FieldDescription>
          </FieldSet>
          <form.Field
            name={`party`}
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <SelectField
                  placeholder="Select party"
                  isInvalid={isInvalid}
                  field={field}
                  wrapperClassName="basis-full"
                  className="w-full data-placeholder:font-normal"
                  options={[
                    {
                      value: 'groom',
                      label: 'Groom',
                    },
                    {
                      value: 'bride',
                      label: 'Bride',
                    },
                    {
                      value: 'planner',
                      label: 'Event Planner',
                    },
                  ]}
                />
              );
            }}
          />
        </FieldGroup> */}
      </div>
      <DialogFooter className="flex-row justify-center sm:justify-center">
        <DialogClose asChild>
          <Button type="button" variant="neutral">
            Go back
          </Button>
        </DialogClose>
        <ButtonLoading
          label="Remove party"
          isPending={isPending}
          type="button"
          variant={'destructive'}
          onClick={() => handleRemoveParty()}
        />
        {/* <Button
          type="button"
          onClick={() => handleRemoveParty()}
          // onClick={() => form.handleSubmit()}
          variant={'destructive'}
        >
          Remove party
        </Button> */}
      </DialogFooter>
    </form>
  );
};
