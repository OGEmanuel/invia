import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { Field, FieldError, FieldLabel, FieldSet } from '../../field';
import type { FormFieldApi } from '@/lib/constants';
import { $createVariableNode, VariableNode } from './variable-node';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, $getSelection, $isRangeSelection } from 'lexical';
import { ResetEditorPlugin } from './reset-editor';
import { LoadInitialValue } from './load-initial-value';
import { Button } from '../../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../dropdown-menu';
import { Plus } from 'lucide-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { cn } from '@/lib/utils';

interface VariableInputFieldProps<TValue = string> {
  field: FormFieldApi<TValue>;
  isInvalid?: boolean;
  label: string;
  editorResetKey: number;
}

const VariableInputField = <TValue = string,>(
  props: VariableInputFieldProps<TValue>,
) => {
  const { field, label, isInvalid, editorResetKey } = props;

  return (
    <LexicalComposer
      initialConfig={{
        namespace: field.name,
        nodes: [VariableNode],
        onError: e => {
          throw e;
        },
      }}
    >
      <Field aria-invalid={isInvalid} className="gap-2">
        <FieldSet className="flex-row items-center justify-between">
          <FieldLabel
            htmlFor={field.name}
            className="text-sm/5 font-medium tracking-tight text-[#575554]"
          >
            {label}
          </FieldLabel>
          <VariableDropdown>
            <Button
              type="button"
              className="h-8! rounded-[8px] border border-dashed border-[#6155F5]/10 bg-[#6155F5]/5 text-sm/[22px] font-medium text-[#6155f5] hover:bg-[#6155F5]/2"
            >
              <Plus className="size-4 text-[#6155F5]" />
              Insert variable
            </Button>
          </VariableDropdown>
        </FieldSet>
        <div
          className={cn(
            'relative rounded-[12px] border border-black/8 p-3',
            isInvalid && 'border-destructive',
          )}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-22 text-sm/[22px] -tracking-[0.02em] outline-none" />
            }
            placeholder={
              <p className="pointer-events-none absolute top-2.5 text-sm/[22px] -tracking-[0.02em] text-gray-400">
                Hi {`{guest_name}`}, you are cordially invited to{' '}
                {`{event_name}`}...
              </p>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />

          <HistoryPlugin />

          <OnChangePlugin
            onChange={editorState => {
              editorState.read(() => {
                const text = $getRoot().getTextContent();
                field.handleChange(String(text) as TValue);
              });
            }}
          />
          <ResetEditorPlugin resetKey={editorResetKey} />
        </div>
        <LoadInitialValue value={String(field.state.value)} />
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    </LexicalComposer>
  );
};

export default VariableInputField;

const VariableDropdown = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  const [editor] = useLexicalComposerContext();

  const insert = (name: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const node = $createVariableNode(name);
      selection.insertNodes([node]);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-999">
        <DropdownMenuItem
          className="text-sm"
          onSelect={() => insert('event_name')}
        >
          Event Name
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm"
          onSelect={() => insert('guest_name')}
        >
          Guest Name
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm"
          onSelect={() => insert('event_type')}
        >
          Event Type
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm"
          onSelect={() => insert('event_location')}
        >
          Event Location
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm"
          onSelect={() => insert('event_date')}
        >
          Event Date
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
