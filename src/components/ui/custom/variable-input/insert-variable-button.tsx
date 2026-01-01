import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $createVariableNode } from './variable-node';

export function InsertVariableButton({ name }: { name: string }) {
  const [editor] = useLexicalComposerContext();

  const insert = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const node = $createVariableNode(name);
      selection.insertNodes([node]);
      selection.insertText(' ');
    });
  };

  return (
    <button type={'button'} onClick={insert}>
      Insert {`{${name}}`}
    </button>
  );
}
