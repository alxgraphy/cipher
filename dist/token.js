"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IN = exports.WHILE = exports.FOR = exports.RETURN = exports.ELSE = exports.IF = exports.FALSE = exports.TRUE = exports.CONST = exports.LET = exports.FUNCTION = exports.COLON = exports.RBRACKET = exports.LBRACKET = exports.RBRACE = exports.LBRACE = exports.RPAREN = exports.LPAREN = exports.SEMICOLON = exports.COMMA = exports.PIPE = exports.NOT_EQ = exports.EQ = exports.GT = exports.LT = exports.SLASH = exports.ASTERISK = exports.BANG = exports.MINUS = exports.PLUS = exports.ASSIGN = exports.STRING = exports.INT = exports.IDENT = exports.EOF = exports.ILLEGAL = void 0;
exports.lookupIdent = lookupIdent;
// --- Special Tokens ---
exports.ILLEGAL = "ILLEGAL"; // A token/character we don't know about
exports.EOF = "EOF"; // "End of File"
// --- Identifiers & Literals ---
exports.IDENT = "IDENT"; // add, foobar, x, y, ...
exports.INT = "INT"; // 1343456
exports.STRING = "STRING"; // "hello world"
// --- Operators ---
exports.ASSIGN = "=";
exports.PLUS = "+";
exports.MINUS = "-";
exports.BANG = "!";
exports.ASTERISK = "*";
exports.SLASH = "/";
exports.LT = "<";
exports.GT = ">";
exports.EQ = "==";
exports.NOT_EQ = "!=";
exports.PIPE = "|>";
// --- Delimiters ---
exports.COMMA = ",";
exports.SEMICOLON = ";";
exports.LPAREN = "(";
exports.RPAREN = ")";
exports.LBRACE = "{";
exports.RBRACE = "}";
exports.LBRACKET = "[";
exports.RBRACKET = "]";
exports.COLON = ":";
// --- Keywords ---
exports.FUNCTION = "FUNCTION";
exports.LET = "LET";
exports.CONST = "CONST";
exports.TRUE = "TRUE";
exports.FALSE = "FALSE";
exports.IF = "IF";
exports.ELSE = "ELSE";
exports.RETURN = "RETURN";
exports.FOR = "FOR";
exports.WHILE = "WHILE";
exports.IN = "IN";
// A map to look up keywords and get their token type
const keywords = {
    fn: exports.FUNCTION,
    let: exports.LET,
    const: exports.CONST,
    true: exports.TRUE,
    false: exports.FALSE,
    if: exports.IF,
    else: exports.ELSE,
    return: exports.RETURN,
    for: exports.FOR,
    while: exports.WHILE,
    in: exports.IN,
};
/**
 * Checks the keywords map to see whether a given identifier is a keyword.
 * @param identifier The identifier to check.
 * @returns The keyword's token type, or IDENT if it's a user-defined identifier.
 */
function lookupIdent(identifier) {
    return keywords[identifier] || exports.IDENT;
}
