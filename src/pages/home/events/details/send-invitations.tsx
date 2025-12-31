import { Button } from '@/components/ui/button';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
// import InputField from '@/components/ui/custom/input';
import SelectField from '@/components/ui/custom/select';
import TextareaField from '@/components/ui/custom/textarea';
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  //   Field,
  FieldDescription,
  //   FieldError,
  FieldGroup,
  //   FieldLabel,
  //   FieldSet,
} from '@/components/ui/field';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Textarea } from '@/components/ui/textarea';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useState } from 'react';
import z from 'zod';

const SendInvitations = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContentWrapper
        title="Send Invitations"
        description="Send invitations to your guests."
      >
        <SendInvitationsForm>
          <DialogFooter className="border-t border-[#00000014] p-4">
            <DialogClose asChild>
              <Button type="button" variant={'neutral'}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </SendInvitationsForm>
      </DialogContentWrapper>
    </Dialog>
  );
};

export default SendInvitations;

const formSchema = z.object({
  sendTo: z.string().min(2, {
    error: 'Please select the recipient group',
  }),
});

const sendToOptions = [
  { label: 'All Guests', value: 'all' },
  { label: 'Groom', value: 'groom' },
  { label: 'Bride', value: 'bride' },
  { label: 'Event Planner', value: 'planner' },
];

const SendInvitationsForm = (props: { children?: React.ReactNode }) => {
  const { children } = props;

  const [mode, setMode] = useState<string>('custom');
  const form = useForm({
    defaultValues: {
      sendTo: '',
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
    <form
      id={`send-invitations-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={'h-[calc(100%-83px)] w-full p-0'}
    >
      <FieldGroup
        className={'flex h-[calc(100%-81px)] flex-col overflow-auto p-4'}
      >
        <form.Field
          name="sendTo"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <SelectField
                label="Send to"
                placeholder="Groom"
                isInvalid={isInvalid}
                field={field}
                options={sendToOptions}
                className="w-full"
              >
                <FieldDescription className="text-sm/5 -tracking-[0.02em] text-[#575554]">
                  <span className="font-medium text-[#212121]">2,234</span>{' '}
                  guests will receive this message
                </FieldDescription>
              </SelectField>
            );
          }}
        />
        <hr className="border-y-[0.5px] border-t border-dashed border-[#00000014]" />
        <FormMode mode={mode} setMode={setMode} />
        <form.Field
          name="sendTo"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <TextareaField
                field={field}
                isInvalid={isInvalid}
                label="Message"
                insertVariable
                placeholder="Hi {guest_name}, you are cordially invited to {event_name}..."
              />
            );
          }}
        />
        {/* <form.Field
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
        /> */}

        {/* <form.Field
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
                          value={types.type}
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
        /> */}
      </FieldGroup>
      {children}
    </form>
  );
};

const FormMode = (props: { mode: string; setMode: any }) => {
  const { mode, setMode } = props;

  return (
    <Tabs value={mode} onValueChange={setMode}>
      <TabsList className="w-full rounded-[12px]">
        <TabsTrigger
          value="custom"
          className="rounded-[8px] data-[state=active]:bg-[#479FFD] data-[state=active]:text-[#FFFFFF]"
        >
          Write Custom
        </TabsTrigger>
        <TabsTrigger
          value="template"
          className="rounded-[8px] data-[state=active]:bg-[#479FFD] data-[state=active]:text-[#FFFFFF]"
        >
          Use Template
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
