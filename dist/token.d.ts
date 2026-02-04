export type TokenType = string;
export interface Token {
    type: TokenType;
    literal: string;
}
export declare const ILLEGAL = "ILLEGAL";
export declare const EOF = "EOF";
export declare const IDENT = "IDENT";
export declare const INT = "INT";
export declare const STRING = "STRING";
export declare const ASSIGN = "=";
export declare const PLUS = "+";
export declare const MINUS = "-";
export declare const BANG = "!";
export declare const ASTERISK = "*";
export declare const SLASH = "/";
export declare const LT = "<";
export declare const GT = ">";
export declare const EQ = "==";
export declare const NOT_EQ = "!=";
export declare const PIPE = "|>";
export declare const COMMA = ",";
export declare const SEMICOLON = ";";
export declare const LPAREN = "(";
export declare const RPAREN = ")";
export declare const LBRACE = "{";
export declare const RBRACE = "}";
export declare const LBRACKET = "[";
export declare const RBRACKET = "]";
export declare const COLON = ":";
export declare const FUNCTION = "FUNCTION";
export declare const LET = "LET";
export declare const CONST = "CONST";
export declare const TRUE = "TRUE";
export declare const FALSE = "FALSE";
export declare const IF = "IF";
export declare const ELSE = "ELSE";
export declare const RETURN = "RETURN";
export declare const FOR = "FOR";
export declare const WHILE = "WHILE";
export declare const IN = "IN";
/**
 * Checks the keywords map to see whether a given identifier is a keyword.
 * @param identifier The identifier to check.
 * @returns The keyword's token type, or IDENT if it's a user-defined identifier.
 */
export declare function lookupIdent(identifier: string): TokenType;
//# sourceMappingURL=token.d.ts.map