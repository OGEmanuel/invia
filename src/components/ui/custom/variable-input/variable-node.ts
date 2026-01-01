import {
  DecoratorNode,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
} from 'lexical';
import type { ReactNode } from 'react';

export type SerializedVariableNode = {
  type: 'variable';
  name: string;
  version: 1;
} & SerializedLexicalNode;

export class VariableNode extends DecoratorNode<ReactNode> {
  __name: string;

  static getType() {
    return 'variable';
  }

  static clone(node: VariableNode) {
    return new VariableNode(node.__name, node.__key);
  }

  constructor(name: string, key?: NodeKey) {
    super(key);
    this.__name = name;
  }

  decorate() {
    return `{${this.__name}}`;
  }

  createDOM() {
    const span = document.createElement('span');
    span.className = 'text-[#6155F5] font-medium';
    return span;
  }

  updateDOM() {
    return false;
  }

  getTextContent() {
    return `{${this.__name}}`;
  }

  exportJSON(): SerializedVariableNode {
    return {
      type: 'variable',
      name: this.__name,
      version: 1,
    };
  }

  static importJSON(serialized: SerializedVariableNode) {
    return new VariableNode(serialized.name);
  }

  isInline() {
    return true;
  }

  isTextEntity() {
    return true;
  }
}

/* ✅ REQUIRED helpers */
export function $createVariableNode(name: string): VariableNode {
  return new VariableNode(name);
}

export function $isVariableNode(
  node: LexicalNode | null | undefined,
): node is VariableNode {
  return node instanceof VariableNode;
}
