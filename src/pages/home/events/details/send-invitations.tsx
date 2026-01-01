import { Button } from '@/components/ui/button';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import SelectField from '@/components/ui/custom/select';
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useState } from 'react';
import z from 'zod';
import VariableInputField from '@/components/ui/custom/variable-input';
import { Plus } from 'lucide-react';

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
  message: z.string().min(2, { error: 'Please enter a message' }),
});

const sendToOptions = [
  { label: 'All Guests', value: 'all' },
  { label: 'Groom', value: 'groom' },
  { label: 'Bride', value: 'bride' },
  { label: 'Event Planner', value: 'planner' },
];

const SendInvitationsForm = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  const [editorResetKey, setEditorResetKey] = useState(0);

  const [mode, setMode] = useState<string>('custom');
  const form = useForm({
    defaultValues: {
      sendTo: '',
      message: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      form.reset();
      handleReset();
    },
  });

  const handleReset = () => {
    form.reset();
    setEditorResetKey(k => k + 1);
  };

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
          <FieldSet className="flex-row items-center justify-between">
            <FieldSet>
              <FieldLegend className="mb-0 text-sm! leading-5.5 font-medium -tracking-[0.02em] text-[#212121]">
                Follow-up messages
              </FieldLegend>
              <FieldDescription className="leading-5.5 -tracking-[0.02em] text-[#575554]">
                Send automatic reminders based on conditions
              </FieldDescription>
            </FieldSet>
            <Button type="button" variant={'neutral'} className="text-sm">
              <Plus />
              Add follow-up
            </Button>
          </FieldSet>
        </FieldGroup>
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
