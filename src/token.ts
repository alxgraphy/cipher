// A string representing the type of a token
export type TokenType = string;

// A structure representing a lexical token
export interface Token {
  type: TokenType;
  literal: string;
}

// --- Special Tokens ---
export const ILLEGAL = "ILLEGAL"; // A token/character we don't know about
export const EOF = "EOF"; // "End of File"

// --- Identifiers & Literals ---
export const IDENT = "IDENT"; // add, foobar, x, y, ...
export const INT = "INT"; // 1343456
export const STRING = "STRING"; // "hello world"

// --- Operators ---
export const ASSIGN = "=";
export const PLUS = "+";
export const MINUS = "-";
export const BANG = "!";
export const ASTERISK = "*";
export const SLASH = "/";
export const LT = "<";
export const GT = ">";
export const EQ = "==";
export const NOT_EQ = "!=";
export const PIPE = "|>";


// --- Delimiters ---
export const COMMA = ",";
export const SEMICOLON = ";";
export const LPAREN = "(";
export const RPAREN = ")";
export const LBRACE = "{";
export const RBRACE = "}";
export const LBRACKET = "[";
export const RBRACKET = "]";
export const COLON = ":";

// --- Keywords ---
export const FUNCTION = "FUNCTION";
export const LET = "LET";
export const CONST = "CONST";
export const TRUE = "TRUE";
export const FALSE = "FALSE";
export const IF = "IF";
export const ELSE = "ELSE";
export const RETURN = "RETURN";
export const FOR = "FOR";
export const WHILE = "WHILE";
export const IN = "IN";

// A map to look up keywords and get their token type
const keywords: { [key: string]: TokenType } = {
  fn: FUNCTION,
  let: LET,
  const: CONST,
  true: TRUE,
  false: FALSE,
  if: IF,
  else: ELSE,
  return: RETURN,
  for: FOR,
  while: WHILE,
  in: IN,
};

/**
 * Checks the keywords map to see whether a given identifier is a keyword.
 * @param identifier The identifier to check.
 * @returns The keyword's token type, or IDENT if it's a user-defined identifier.
 */
export function lookupIdent(identifier: string): TokenType {
  return keywords[identifier] || IDENT;
}
