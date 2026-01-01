import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { useRef, useEffect } from 'react';
import { createNodesFromText } from './create-nodes-from-text';

export function LoadInitialValue({ value }: { value: string }) {
  const [editor] = useLexicalComposerContext();
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    editor.update(() => {
      const root = $getRoot();
      root.clear();

      if (!value) return;

      const paragraph = createNodesFromText(value);
      root.append(paragraph);
    });
  }, [editor, value]);

  return null;
}
