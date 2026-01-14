import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/custom/input';
import SelectField from '@/components/ui/custom/select';
import VariableInputField from '@/components/ui/custom/variable-input';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { cn, scrollToBottom, scrollToFirstError } from '@/lib/utils';
import { revalidateLogic, useField, useForm } from '@tanstack/react-form';
import { Plus, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import z from 'zod';

const followUpSchema = z.object({
  rsvp: z.string().min(2, { error: 'Please select RSVP status' }),
  numOfDays: z.string().min(1, { error: 'Please select number of days' }),
  message: z.string().min(2, { error: 'Please enter a message' }),
});

const formSchema = z.object({
  templateName: z.string().min(2, {
    error: 'Please enter a valid template name.',
  }),
  eventType: z.string().min(2, {
    error: 'Please select the event type.',
  }),
  message: z.string().min(2, { error: 'Please enter a message' }),
  followUp: z.array(followUpSchema),
});

type SendInvitationsFormSchema = z.infer<typeof formSchema>;

const TemplateForm = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  const [editorResetKey, setEditorResetKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    defaultValues: {
      templateName: '',
      eventType: 'all',
      message: '',
      followUp: [],
    } as SendInvitationsFormSchema,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmitInvalid: () => scrollToFirstError(form),
    onSubmit: async ({ value }) => {
      console.log(value);
      handleReset();
    },
  });

  const followUp = useField({
    name: 'followUp',
    form,
  });

  const handleReset = () => {
    form.reset();
    setEditorResetKey(k => k + 1);
  };

  return (
    <form
      id={`create-template-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={'h-[calc(100%-83px)] w-full p-0'}
    >
      <FieldGroup
        ref={containerRef}
        className={cn(
          'flex h-[calc(100%-85px)] flex-col gap-6 overflow-auto p-4 sm:h-[calc(100%-81px)]',
        )}
      >
        <form.Field
          name={`templateName`}
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <InputField
                field={field}
                isInvalid={isInvalid}
                label="Template name"
                placeholder="Enter template name.."
                className="h-10 w-full"
              />
            );
          }}
        />
        <form.Field
          name="eventType"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <SelectField
                label="Event type"
                placeholder="Groom"
                isInvalid={isInvalid}
                field={field}
                options={[
                  {
                    value: 'all',
                    label: 'All Events',
                  },
                  {
                    value: 'wedding',
                    label: 'Wedding',
                  },
                  {
                    value: 'party',
                    label: 'Party',
                  },
                  {
                    value: 'corporate',
                    label: 'Corporate',
                  },
                  {
                    value: 'others',
                    label: 'Others',
                  },
                ]}
                className="w-full"
              />
            );
          }}
        />
        <hr className="border-y-[0.5px] border-t border-dashed border-[#00000014]" />
        <form.Field
          name="message"
          children={field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <VariableInputField
                isInvalid={isInvalid}
                field={field}
                label="Message"
                editorResetKey={editorResetKey}
              />
            );
          }}
        />
        <FieldGroup>
          <FieldSet className={cn('flex-row items-center justify-between')}>
            <FieldSet>
              <FieldLegend className="mb-0 text-sm! leading-5.5 font-medium -tracking-[0.02em] text-[#212121]">
                Follow-up messages
              </FieldLegend>
              <FieldDescription className="leading-5.5 -tracking-[0.02em] text-[#575554]">
                Send automatic reminders based on conditions
              </FieldDescription>
            </FieldSet>
            <Button
              type="button"
              onClick={() => {
                followUp.pushValue({ rsvp: '', numOfDays: '', message: '' });
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    scrollToBottom(containerRef);
                  });
                });
              }}
              variant={'neutral'}
              className="text-sm"
            >
              <Plus />
              Add follow-up
            </Button>
          </FieldSet>
        </FieldGroup>
        <FieldGroup
          className={cn(followUp.state.value?.length < 1 && 'hidden')}
        >
          <FieldSet>
            <form.Field
              name="followUp"
              mode="array"
              children={field => {
                return (
                  <FieldGroup className="gap-6">
                    {field?.state?.value?.map((_, i) => {
                      return (
                        <FieldSet
                          key={i}
                          className="rounded-3xl border border-black/8 bg-[#FEFCF9] p-2"
                        >
                          <FieldGroup className="flex-row items-center justify-between max-sm:gap-0">
                            <FieldSet className="flex-row items-center gap-2">
                              <form.Field
                                name={`followUp[${i}].rsvp`}
                                children={field => {
                                  const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                  return (
                                    <SelectField
                                      placeholder="RSVP"
                                      isInvalid={isInvalid}
                                      field={field}
                                      errorClassName="absolute text-xs w-44! -bottom-6"
                                      options={[
                                        {
                                          value: 'no-rsvp',
                                          label: 'If No RSVP',
                                        },
                                        {
                                          value: 'rsvp',
                                          label: 'If RSVP',
                                        },
                                      ]}
                                      wrapperClassName="sm:w-max relative"
                                      className="h-10! w-32 bg-white"
                                    />
                                  );
                                }}
                              />
                              <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
                                after
                              </p>
                              <form.Field
                                name={`followUp[${i}].numOfDays`}
                                children={field => {
                                  const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                  return (
                                    <SelectField
                                      placeholder="Days"
                                      isInvalid={isInvalid}
                                      errorClassName="absolute text-xs w-52! -bottom-6"
                                      field={field}
                                      options={[
                                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                      ].map(num => {
                                        return {
                                          value: num.toString(),
                                          label: `${num.toString()} day${num > 1 ? 's' : ''}`,
                                        };
                                      })}
                                      wrapperClassName="sm:w-max relative"
                                      className="h-10! w-28 bg-white"
                                    />
                                  );
                                }}
                              />
                            </FieldSet>
                            <Button
                              size="icon"
                              variant={'ghost'}
                              className="size-10"
                              onClick={() => field.removeValue(i)}
                              type="button"
                            >
                              <Trash2 className="size-6 text-[#A3A19D]" />
                            </Button>
                          </FieldGroup>
                          <hr className="border-y-[0.5px] border-dashed border-black/8" />
                          <form.Field
                            name={`followUp[${i}].message`}
                            children={field => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                              return (
                                <VariableInputField
                                  isInvalid={isInvalid}
                                  field={field}
                                  label="Follow-up message"
                                  editorResetKey={editorResetKey}
                                  className="bg-white"
                                />
                              );
                            }}
                          />
                        </FieldSet>
                      );
                    })}
                  </FieldGroup>
                );
              }}
            />
          </FieldSet>
        </FieldGroup>
      </FieldGroup>
      {children}
    </form>
  );
};

export default TemplateForm;
