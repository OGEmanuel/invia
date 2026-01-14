// 122px is the height of the form description box
// 223px is the height of the mobile prelim sections

import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/custom/input';
import PhoneField from '@/components/ui/custom/phone';
import SelectField from '@/components/ui/custom/select';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { cn, scrollToBottom, scrollToFirstError } from '@/lib/utils';
import { revalidateLogic, useField, useForm } from '@tanstack/react-form';
import { Plus, Trash2, X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import z from 'zod';
import { AddParty, AddPartyMobileSheet } from './modals/add-party';
import { RemovePartyDialog } from './modals/remove-party';
import { useLocation, useParams, useSearch } from '@tanstack/react-router';
import type { Party } from '@/lib/constants';
import Skeleton from '@/components/ui/custom/skeleton';
import { useGetEventParties } from '@/lib/queries/hooks';
import { useGuestStore } from '@/store/guest-form-store';
import ButtonLoading from '@/components/ui/custom/button-loading';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/queries/query-keys';
import { useFormStore } from '@/store/submitting-store';

const addGuestFormSchema = z.object({
  guestName: z.string().min(2, {
    error: 'Please enter a valid guest name.',
  }),
  party: z
    .string({
      error: 'Please select a party.',
    })
    .optional(),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    error: 'Please enter a valid WhatsApp number.',
  }),
  email: z
    .email({
      error: 'Please enter a valid email address.',
    })
    .optional(),
});

const AddGuestForm = (props: { className?: string }) => {
  const { className } = props;
  const { pathname } = useLocation();
  const { eventId } = useParams({
    from: pathname.includes('/share-guest-list')
      ? '/share-guest-list/$eventId'
      : '/_authenticated/$eventId',
  });
  const { guestFilter } = useSearch({
    from: pathname.includes('/share-guest-list')
      ? '/share-guest-list/$eventId'
      : '/_authenticated/$eventId',
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { setFormSubmitting } = useFormStore();

  const setGuests = useGuestStore(state => state.setGuests);

  const { data, isPending, isError } = useGetEventParties(eventId);

  const { guests: formGuests } = useGuestStore();

  const lengthOfNonEmptyGuests = guestFilter
    ? formGuests.filter(guest => guest.guestName !== '' && guest.party !== '')
        .length
    : formGuests.filter(guest => guest.guestName !== '').length;

  const parties: Party[] = data?.data;

  const formSchema = z.object({
    guest: z.array(
      parties?.length
        ? addGuestFormSchema.refine(g => !!g.party, {
            path: ['party'],
            message: 'Party is required',
          })
        : addGuestFormSchema,
    ),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const { mutate, isPending: isAddingGuests } = useSendRequest<
    { guests: { party: string; name: string; phone: string; email: string }[] },
    any
  >({
    mutationFn: (data: {
      guests: { party: string; name: string; phone: string; email: string }[];
    }) => MUTATIONS.addEventGuests(data, eventId),
    successToast: {
      title: 'Success!',
      description: 'Guests added successfully.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: () => {
      form.setFieldValue(
        'guest',
        guestsField.state.value.map(() => ({
          guestName: '',
          party: '',
          whatsappNumber: '',
          email: '',
        })),
      );
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.events.guests(1, 50, eventId),
      });
    },
  });

  useEffect(() => {
    setFormSubmitting(isAddingGuests);
  }, [isAddingGuests]);

  const form = useForm({
    defaultValues: {
      guest: [
        {
          guestName: '',
          whatsappNumber: '',
          party: '',
          email: undefined,
        },
      ],
    } as formSchemaType,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmitInvalid: () => scrollToFirstError(form),
    onSubmit: ({ value }) => {
      mutate({
        guests: value.guest.map(
          ({ guestName, whatsappNumber, party, email }) => ({
            name: guestName,
            phone: whatsappNumber,
            party: `${party}`,
            email: `${email}`,
          }),
        ),
      });
    },
  });

  const guestsField = useField({ name: 'guest', form });

  useEffect(() => {
    setGuests(form.state.values.guest);

    let timeoutId: number;

    const unsubscribe = form.store.subscribe(() => {
      // Clear previous timeout
      clearTimeout(timeoutId);

      // Set new timeout
      timeoutId = setTimeout(() => {
        console.log('Form updated:', form.state.values.guest);
        setGuests([...form.state.values.guest]);
      }, 500); // 300ms debounce delay
    });

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [form]);

  const guest = useField({
    name: 'guest',
    form,
  });

  const partyOptions = parties?.map(party => ({
    label: party.name,
    value: party.name,
  }));

  return (
    <section className={cn('w-full max-lg:pt-5 lg:p-0', className)}>
      <div className="flex flex-col gap-6">
        <div
          className={cn(
            'flex flex-col gap-2 border-b border-black/8 pb-4 max-lg:mx-3.5 lg:gap-3 lg:pb-6',
            (parties?.length < 1 || isError) &&
              'flex-row items-center justify-between',
          )}
        >
          <div>
            <h2 className="mb-2 text-xl/7 text-[#212121] lg:font-serif">
              Event parties
            </h2>
            <p className="text-xm/[22px] -tracking-[0.02em] text-[#575554] max-lg:hidden">
              Use event parties to organize guests into meaningful groups.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'flex flex-wrap items-center gap-2',
                isError && 'hidden',
              )}
            >
              {isPending
                ? Array(2)
                    .fill(0)
                    .map((_, i) => <PartyPillLoading key={i} />)
                : parties.map(party => (
                    <div
                      key={party.id}
                      className="flex w-max items-center gap-1 rounded-[99px] bg-[#6155F5] px-2.5 py-1.25"
                    >
                      {/* <AddParty asChild={false}> */}
                      <p className="text-sm/[22px] font-medium -tracking-[0.02em] text-white">
                        {party.name}
                      </p>
                      {/* </AddParty> */}
                      <RemovePartyDialog party={party}>
                        <Button
                          size={'icon'}
                          type="button"
                          className="size-4 rounded-none hover:bg-transparent"
                          variant={'ghost'}
                        >
                          <X className="text-white/50" />
                        </Button>
                      </RemovePartyDialog>
                    </div>
                  ))}
            </div>
            <AddParty>
              <Button
                variant={'ghost'}
                size={'icon-sm'}
                type="button"
                className="rounded-full border border-[#6155F5]/12 max-sm:hidden"
              >
                <Plus className="size-5 text-[#6155F5]" />
              </Button>
            </AddParty>
            <AddPartyMobileSheet>
              <Button
                variant={'ghost'}
                size={'icon-sm'}
                type="button"
                className="rounded-full border border-[#6155F5]/12 sm:hidden"
              >
                <Plus className="size-5 text-[#6155F5]" />
              </Button>
            </AddPartyMobileSheet>
          </div>
        </div>
        <form
          id={`add-guest-form`}
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup
            ref={containerRef}
            className="h-[calc(100vh-341px)] flex-col gap-6 overflow-auto max-lg:px-3.5 max-lg:pb-6 lg:h-[calc(100vh-283px)]"
          >
            <form.Field
              name="guest"
              mode="array"
              children={field => {
                return (
                  <FieldGroup className="gap-6 lg:gap-4">
                    {field.state.value.map((_, i) => {
                      return (
                        <React.Fragment key={i}>
                          <>
                            <FieldSet className="gap-2 sm:flex-row sm:items-end">
                              <FieldSet className="flex-row items-end gap-2 sm:basis-full">
                                <form.Field
                                  name={`guest[${i}].guestName`}
                                  children={field => {
                                    const isInvalid =
                                      field.state.meta.isTouched &&
                                      !field.state.meta.isValid;
                                    return (
                                      <InputField
                                        field={field}
                                        isInvalid={isInvalid}
                                        label="Guest name"
                                        placeholder="Mr & Mrs Williams’ Wedding"
                                        wrapperClassName="relative basis-full"
                                        className="h-10 w-full"
                                        errorClassName="absolute text-xs w-48! -bottom-4"
                                      />
                                    );
                                  }}
                                />
                                {field?.state?.value?.length > 1 && (
                                  <Button
                                    type="button"
                                    size={'lg'}
                                    variant={'ghost'}
                                    onClick={() => field.removeValue(i)}
                                    className="size-10 border border-black/8 sm:hidden"
                                  >
                                    <Trash2 className="text-destructive size-5" />
                                  </Button>
                                )}
                              </FieldSet>
                              <form.Field
                                name={`guest[${i}].party`}
                                children={field => {
                                  const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                  return (
                                    <SelectField
                                      label="Party"
                                      placeholder="Groom"
                                      isInvalid={isInvalid}
                                      disabled={parties?.length < 1}
                                      field={field as any}
                                      options={partyOptions}
                                      wrapperClassName="sm:w-max relative"
                                      className="h-10! w-full sm:w-41"
                                      errorClassName="absolute text-xs w-48! -bottom-4"
                                    />
                                  );
                                }}
                              />
                              {field?.state?.value?.length > 1 && (
                                <Button
                                  type="button"
                                  size={'lg'}
                                  variant={'ghost'}
                                  onClick={() => field.removeValue(i)}
                                  className="size-10 border border-black/8 max-sm:hidden"
                                >
                                  <Trash2 className="text-destructive size-5" />
                                </Button>
                              )}
                            </FieldSet>
                            <FieldSet className="gap-2 sm:flex-row sm:items-end">
                              <form.Field
                                name={`guest[${i}].whatsappNumber`}
                                children={field => {
                                  const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                  return (
                                    <PhoneField
                                      isInvalid={isInvalid}
                                      field={field}
                                      label="WhatsApp Number"
                                      wrapperClassName="basis-full relative"
                                      errorClassName="absolute text-xs -bottom-4"
                                    />
                                  );
                                }}
                              />
                              <form.Field
                                name={`guest[${i}].email`}
                                children={field => {
                                  const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                  return (
                                    <InputField
                                      field={field}
                                      isInvalid={isInvalid}
                                      type="email"
                                      label="Email"
                                      placeholder="Enter email"
                                      wrapperClassName="basis-full"
                                      optional
                                    />
                                  );
                                }}
                              />
                            </FieldSet>
                          </>
                          {field.state.value.length - 1 !== i && (
                            <hr className="h-2.5 border-0 bg-[#F7F5F2]" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </FieldGroup>
                );
              }}
            />
            <Button
              type="button"
              onClick={() => (
                guest.pushValue({
                  guestName: '',
                  party: '',
                  whatsappNumber: '',
                  email: undefined,
                }),
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    scrollToBottom(containerRef);
                  });
                })
              )}
              className="h-10 w-max self-end border border-dashed border-[#6155F5]/20 bg-[#6155F5]/8 text-[#6155F5] hover:bg-[#6155F5]/10"
            >
              <Plus className="size-5" />
              Add another guest
            </Button>
          </FieldGroup>
          <div className="fixed bottom-0 w-full border-t border-black/8 bg-[#FEFCF9] p-5 lg:hidden">
            <ButtonLoading
              label={`Add ${lengthOfNonEmptyGuests > 0 ? `(${lengthOfNonEmptyGuests})` : ''} guest${lengthOfNonEmptyGuests > 1 ? 's' : ''}`}
              isPending={isPending}
              className="h-10 w-full"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddGuestForm;

const PartyPillLoading = () => {
  return (
    <div className="flex w-max items-center gap-1 rounded-[99px] bg-[#6155F5]/20 px-2.5 py-1.25">
      <Skeleton className="h-4 w-12 rounded-sm" />
      <Skeleton className="size-4 rounded-full" />
    </div>
  );
};
