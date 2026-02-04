import * as token from "./token";
declare class Lexer {
    private input;
    private position;
    private readPosition;
    private ch;
    constructor(input: string);
    /**
     * Reads the next character from the input and advances the position pointers.
     */
    private readChar;
    /**
     * Returns the next character without consuming it.
     */
    private peekChar;
    /**
     * Skips over any whitespace characters.
     */
    private skipWhitespace;
    /**
     * Reads an identifier (e.g., variable name, function name).
     */
    private readIdentifier;
    /**
     * Reads a number literal.
     */
    private readNumber;
    /**
     * Reads a string literal.
     */
    private readString;
    private isLetter;
    private isDigit;
    /**
     * Returns the next token from the input.
     */
    nextToken(): token.Token;
}
export default Lexer;
//# sourceMappingURL=lexer.d.ts.map