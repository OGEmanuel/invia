import React from "react";

const VARIABLE_REGEX = /\{[a-zA-Z_][a-zA-Z0-9_]*\}/g;

export function renderStyledVariables(text: string) {
  const tokens = text.split(VARIABLE_REGEX);
  const matches = text.match(VARIABLE_REGEX) ?? [];

  return tokens.map((chunk, index) => (
    <React.Fragment key={index}>
      {chunk}
      {matches[index] && (
        <span className="text-[#6155F5]">{matches[index]}</span>
      )}
    </React.Fragment>
  ));
}