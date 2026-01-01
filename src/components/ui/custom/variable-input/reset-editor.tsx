import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';

type Props = {
  resetKey: number;
  value?: string;
};

export function ResetEditorPlugin({ resetKey, value = '' }: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();

      if (!value) return;

      const paragraph = $createParagraphNode();
      paragraph.append($createTextNode(value));
      root.append(paragraph);
    });
  }, [editor, resetKey, value]);

  return null;
}
