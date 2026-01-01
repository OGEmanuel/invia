import { $createTextNode, $createParagraphNode } from 'lexical';
import { $createVariableNode } from './variable-node';

const VARIABLE_REGEX = /\{([a-zA-Z0-9_]+)\}/g;

export function createNodesFromText(text: string) {
  const paragraph = $createParagraphNode();

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    const [fullMatch, name] = match;
    const start = match.index;

    // text before variable
    if (start > lastIndex) {
      paragraph.append($createTextNode(text.slice(lastIndex, start)));
    }

    // variable node
    paragraph.append($createVariableNode(name));

    lastIndex = start + fullMatch.length;
  }

  // remaining text
  if (lastIndex < text.length) {
    paragraph.append($createTextNode(text.slice(lastIndex)));
  }

  return paragraph;
}
