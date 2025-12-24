import { Button } from '@/components/ui/button';
import Banner from '../banner';
import StarCalendar from '@/assets/jsx-icons/star-calendar';
import MainContent from './main-content';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import z from 'zod';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import Heart from '@/assets/jsx-icons/heart';
import Party from '@/assets/jsx-icons/party';
import Corporate from '@/assets/jsx-icons/corporate';
import Others from '@/assets/jsx-icons/others';
import InputField from '@/components/ui/custom/input';

const Events = () => {
  return (
    <>
      <Banner
        header="Manage your events with elegance"
        description="Plan events effortlessly with structured guest lists and seamless invitations."
        className="pt-10 pb-5 md:pt-15 md:pb-18"
      >
        <CreateEvent>
          <Button className="max-sm:w-max [&_svg:not([class*='size-'])]:size-6">
            <StarCalendar />
            Create event
          </Button>
        </CreateEvent>
      </Banner>
      <MainContent />
    </>
  );
};

export default Events;

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
    message: 'Please enter a valid type.',
  }),
  eventName: z.string().min(2, {
    message: 'Please enter a valid event name.',
  }),
  eventDate: z.string().min(2, {
    message: 'Please enter a valid date.',
  }),
  eventTime: z.string().min(2, {
    message: 'Please enter a valid time.',
  }),
  eventLocation: z.string().min(2, {
    message: 'Please enter a valid location.',
  }),
});

const CreateEvent = (props: { children?: React.ReactNode }) => {
  const { children } = props;

  const form = useForm({
    defaultValues: {
      eventType: '',
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-160 flex-col rounded-3xl p-0 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6">
        <DialogHeader className="gap-0.5 border-b border-[#00000014] p-4">
          <DialogTitle className="text-xl/7 text-[#212121]">
            Create new event
          </DialogTitle>
          <DialogDescription className="font-inter text-sm/5 -tracking-[0.02em] text-[#575554]">
            Create an event and manage your guest list.
          </DialogDescription>
        </DialogHeader>
        <form
          id={`create-event-form`}
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex w-full px-4 pb-4"
        >
          <FieldGroup className="flex flex-col gap-6">
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
                            'font-inter group transition-colors has-data-[state=checked]:border-transparent has-data-[state=checked]:text-white has-[>[data-slot=field]]:border-[#00000014] *:data-[slot=field]:py-3.25',
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
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
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
                              value={types.type}
                              id={`${field.name}-${types.type}`}
                              aria-invalid={isInvalid}
                              className="hidden"
                            />
                          </Field>
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
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
                  <InputField
                    field={field}
                    isInvalid={isInvalid}
                    label="Event date"
                    type="date"
                  />
                );
              }}
            />
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};
