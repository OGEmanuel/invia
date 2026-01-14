import Corporate from '@/assets/jsx-icons/corporate';
import Heart from '@/assets/jsx-icons/heart';
import Location from '@/assets/jsx-icons/location';
import Others from '@/assets/jsx-icons/others';
import Party from '@/assets/jsx-icons/party';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import InputField from '@/components/ui/custom/input';
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Events } from '@/lib/constants';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS, QUERIES } from '@/lib/queries';
import { QUERY_KEYS } from '@/lib/queries/query-keys';
import { cn } from '@/lib/utils';
import { useFormStore } from '@/store/submitting-store';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import z from 'zod';

const useGetEventInfo = (eventId?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.events.info(eventId!!),
    queryFn: () => QUERIES.getEventInfo(eventId!!),
    enabled: !!eventId,
  });
};

const EVENT_TYPES = [
  {
    id: 1,
    type: 'wedding',
  },
  {
    id: 2,
    type: 'party',
  },
  {
    id: 3,
    type: 'corporate',
  },
  {
    id: 4,
    type: 'others',
  },
];

const formSchema = z.object({
  eventType: z.string().min(2, {
    error: 'Please enter a valid type.',
  }),
  eventName: z.string().min(2, {
    error: 'Please enter a valid event name.',
  }),
  eventDate: z.string().min(2, {
    error: 'Please enter a valid date.',
  }),
  eventTime: z.string().optional(),
  eventLocation: z.string().optional(),
});

type EventFormType = z.infer<typeof formSchema>;

const CreateEventsForm = (props: {
  children?: React.ReactNode;
  className?: string;
  onSetOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  eventId?: string;
}) => {
  const { children, className, onSetOpen, eventId } = props;
  const [openPopover, setOpenPopover] = useState(false);
  const queryClient = useQueryClient();

  const { setFormSubmitting } = useFormStore();

  const { data } = useGetEventInfo(eventId);

  const info: Events = data?.data;

  const { mutate: updateEvent, isPending: isUpdatingEvent } = useSendRequest<
    {
      name: string;
      category: string;
      date: string;
      time: string;
      location: string;
    },
    any
  >({
    mutationFn: (data: {
      name: string;
      category: string;
      date: string;
      time: string;
      location: string;
    }) => MUTATIONS.updateEvent(data, eventId!!),
    successToast: {
      title: 'Success!',
      description: 'Event updated successfully.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: () => {
      form.reset();
      onSetOpen?.(false);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.events.info(eventId!!),
      });
    },
  });

  const { mutate, isPending } = useSendRequest<
    {
      name: string;
      category: string;
      date: string;
      time: string;
      location: string;
    },
    any
  >({
    mutationFn: (data: {
      name: string;
      category: string;
      date: string;
      time: string;
      location: string;
    }) => MUTATIONS.createEvent(data),
    successToast: {
      title: 'Success!',
      description: 'Event created successfully.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: () => {
      form.reset();
      onSetOpen?.(false);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.events.all,
      });
    },
  });

  useEffect(() => {
    setFormSubmitting(eventId ? isUpdatingEvent : isPending);
  }, [isPending, isUpdatingEvent]);

  const form = useForm({
    defaultValues: {
      eventType: eventId ? info.category : '',
      eventName: eventId ? info.name : '',
      eventDate: eventId ? info.date : '',
      eventTime: eventId ? info.time : '',
      eventLocation: eventId ? info.location : '',
    } as EventFormType,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      if (eventId) {
        updateEvent({
          name: value.eventName,
          category: value.eventType,
          date: value.eventDate,
          time: `${value.eventTime}`,
          location: `${value.eventLocation}`,
        });
      } else {
        mutate({
          name: value.eventName,
          category: value.eventType,
          date: value.eventDate,
          time: `${value.eventTime}`,
          location: `${value.eventLocation}`,
        });
      }
    },
  });

  return (
    <form
      id={`create-event-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn('w-full p-0', className)}
    >
      <FieldGroup
        className={cn(
          'flex h-[calc(100%-100px)] flex-col justify-between overflow-auto p-4 sm:h-[calc(100%-81px)]',
        )}
      >
        <form.Field
          name="eventType"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FieldSet>
                <RadioGroup
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  className="grid grid-cols-2 gap-2"
                >
                  {EVENT_TYPES.map(types => (
                    <FieldLabel
                      key={types.id}
                      htmlFor={`${field.name}-${types.type}`}
                      className={cn(
                        'group transition-colors has-data-[state=checked]:border-transparent has-data-[state=checked]:text-white has-[>[data-slot=field]]:border-[#00000014] *:data-[slot=field]:py-3.25',
                        types.type === 'wedding' &&
                          'has-data-[state=checked]:bg-[#874CF9]',
                        types.type === 'party' &&
                          'has-data-[state=checked]:bg-[#479FFD]',
                        types.type === 'corporate' &&
                          'has-data-[state=checked]:bg-[#2EC31B]',
                        types.type === 'others' &&
                          'has-data-[state=checked]:bg-[#FD843D]',
                      )}
                    >
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <FieldContent className="flex-row justify-center gap-1">
                          {types.type === 'wedding' && (
                            <>
                              <Heart
                                fill={'#FFFFFF'}
                                size="20"
                                className="hidden group-has-data-[state=checked]:block"
                              />
                              <Heart
                                fill={'#575554'}
                                size="20"
                                className="block group-has-data-[state=checked]:hidden"
                              />
                            </>
                          )}
                          {types.type === 'party' && (
                            <>
                              <Party
                                fill={'#FFFFFF'}
                                size="20"
                                className="hidden group-has-data-[state=checked]:block"
                              />
                              <Party
                                fill={'#575554'}
                                size="20"
                                className="block group-has-data-[state=checked]:hidden"
                              />
                            </>
                          )}
                          {types.type === 'corporate' && (
                            <>
                              <Corporate
                                fill={'#FFFFFF'}
                                size="20"
                                className="hidden group-has-data-[state=checked]:block"
                              />
                              <Corporate
                                fill={'#575554'}
                                size="20"
                                className="block group-has-data-[state=checked]:hidden"
                              />
                            </>
                          )}
                          {types.type === 'others' && (
                            <>
                              <Others
                                fill={'#FFFFFF'}
                                size="20"
                                className="hidden group-has-data-[state=checked]:block"
                              />
                              <Others
                                fill={'#575554'}
                                size="20"
                                className="block group-has-data-[state=checked]:hidden"
                              />
                            </>
                          )}
                          <FieldTitle className="text-sm/[100%] font-medium -tracking-[0.02em] capitalize">
                            {types.type}
                          </FieldTitle>
                        </FieldContent>
                        <RadioGroupItem
                          value={types.type.toUpperCase()}
                          id={`${field.name}-${types.type}`}
                          aria-invalid={isInvalid}
                          className="hidden"
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
        <form.Field
          name="eventName"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <InputField
                field={field}
                isInvalid={isInvalid}
                label="Event name"
                placeholder="Mr & Mrs Williams’ Wedding"
              />
            );
          }}
        />
        <form.Field
          name="eventDate"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FieldSet className="gap-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm/5 font-medium tracking-tight text-[#575554]"
                >
                  Event Date
                </FieldLabel>
                <Popover open={openPopover} onOpenChange={setOpenPopover}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!field.state.value}
                      className="h-auto w-full justify-start border border-[#00000014] py-2.25 text-left text-sm/6 font-normal -tracking-[0.02em] shadow-none hover:bg-transparent active:scale-100 has-[>svg]:px-3.5 data-[empty=true]:text-[#A3A19D]"
                    >
                      <CalendarIcon className="size-5 text-[#A3A19D]" />
                      {field.state.value ? (
                        new Date(field.state.value).toLocaleDateString('en-GB')
                      ) : (
                        <span className="text-sm/6 -tracking-[0.02em]">
                          dd/mm/yyyy
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="z-999 w-auto p-0">
                    <Calendar
                      mode="single"
                      id={field.name}
                      disabled={date => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        return date < today;
                      }}
                      aria-invalid={isInvalid}
                      onDayBlur={field.handleBlur}
                      selected={new Date(field.state.value)}
                      onSelect={date => (
                        field.handleChange(`${date}`),
                        setOpenPopover(false)
                      )}
                    />
                  </PopoverContent>
                </Popover>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </FieldSet>
            );
          }}
        />
        <hr className="border-t border-dashed border-[#00000014] bg-transparent" />
        <form.Field
          name="eventTime"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <InputField
                field={field}
                isInvalid={isInvalid}
                label="Event time"
                placeholder="Enter email"
                type="time"
                optional
              />
            );
          }}
        />
        <form.Field
          name="eventLocation"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <InputField
                field={field}
                isInvalid={isInvalid}
                label="Event location"
                placeholder="Add location.."
                iconPosition="left"
                icon={<Location />}
                optional
              />
            );
          }}
        />
      </FieldGroup>
      {children}
    </form>
  );
};

export default CreateEventsForm;
