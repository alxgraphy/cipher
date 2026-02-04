import * as token from "./token";

class Lexer {
  private input: string;
  private position: number = 0; // current position in input (points to current char)
  private readPosition: number = 0; // current reading position in input (after current char)
  private ch: string = ""; // current char under examination

  constructor(input: string) {
    this.input = input;
    this.readChar();
  }

  /**
   * Reads the next character from the input and advances the position pointers.
   */
  private readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.ch = ""; // NUL byte in ASCII, signifies "end of file"
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }
  
  /**
   * Returns the next character without consuming it.
   */
  private peekChar(): string {
    if (this.readPosition >= this.input.length) {
      return "";
    } else {
      return this.input[this.readPosition];
    }
  }

  /**
   * Skips over any whitespace characters.
   */
  private skipWhitespace(): void {
    while (/\s/.test(this.ch)) {
      this.readChar();
    }
  }

  /**
   * Reads an identifier (e.g., variable name, function name).
   */
  private readIdentifier(): string {
    const startPosition = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.substring(startPosition, this.position);
  }

  /**
   * Reads a number literal.
   */
  private readNumber(): string {
    const startPosition = this.position;
    while (this.isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.substring(startPosition, this.position);
  }

  /**
   * Reads a string literal.
   */
  private readString(): string {
    const startPosition = this.position + 1; // Skip the opening "
    do {
      this.readChar();
    } while (this.ch !== '"' && this.ch !== "");
    return this.input.substring(startPosition, this.position);
  }

  private isLetter(ch: string): boolean {
    return /^[a-zA-Z_]$/.test(ch);
  }

  private isDigit(ch: string): boolean {
    return /^\d$/.test(ch);
  }

  /**
   * Returns the next token from the input.
   */
  public nextToken(): token.Token {
    let tok: token.Token;

    this.skipWhitespace();

    switch (this.ch) {
      case "=":
        if (this.peekChar() === "=") {
          const ch = this.ch;
          this.readChar();
          const literal = ch + this.ch;
          tok = { type: token.EQ, literal };
        } else {
          tok = { type: token.ASSIGN, literal: this.ch };
        }
        break;
      case ";":
        tok = { type: token.SEMICOLON, literal: this.ch };
        break;
      case "(":
        tok = { type: token.LPAREN, literal: this.ch };
        break;
      case ")":
        tok = { type: token.RPAREN, literal: this.ch };
        break;
      case ",":
        tok = { type: token.COMMA, literal: this.ch };
        break;
      case "+":
        tok = { type: token.PLUS, literal: this.ch };
        break;
      case "-":
        tok = { type: token.MINUS, literal: this.ch };
        break;
      case "!":
        if (this.peekChar() === "=") {
          const ch = this.ch;
          this.readChar();
          const literal = ch + this.ch;
          tok = { type: token.NOT_EQ, literal };
        } else {
          tok = { type: token.BANG, literal: this.ch };
        }
        break;
      case "/":
        tok = { type: token.SLASH, literal: this.ch };
        break;
      case "*":
        tok = { type: token.ASTERISK, literal: this.ch };
        break;
      case "<":
        tok = { type: token.LT, literal: this.ch };
        break;
      case ">":
        if (this.peekChar() === "=") {
          const ch = this.ch;
          this.readChar();
          const literal = ch + this.ch;
          tok = { type: token.PIPE, literal: "|>" };
        } else {
            tok = { type: token.GT, literal: this.ch };
        }
        break;
      case "{":
        tok = { type: token.LBRACE, literal: this.ch };
        break;
      case "}":
        tok = { type: token.RBRACE, literal: this.ch };
        break;
       case "[":
        tok = { type: token.LBRACKET, literal: this.ch };
        break;
      case "]":
        tok = { type: token.RBRACKET, literal: this.ch };
        break;
      case ":":
        tok = { type: token.COLON, literal: this.ch };
        break;
      case '"':
        tok = { type: token.STRING, literal: this.readString() };
        break;
      case "|":
          if (this.peekChar() === ">") {
              this.readChar();
              tok = { type: token.PIPE, literal: "|>" };
          } else {
              tok = { type: token.ILLEGAL, literal: this.ch };
          }
          break;
      case "":
        tok = { type: token.EOF, literal: "" };
        break;
      default:
        if (this.isLetter(this.ch)) {
          const literal = this.readIdentifier();
          const type = token.lookupIdent(literal);
          return { type, literal }; // Early return to avoid readChar() at the end
        } else if (this.isDigit(this.ch)) {
          const literal = this.readNumber();
          return { type: token.INT, literal }; // Early return
        } else {
          tok = { type: token.ILLEGAL, literal: this.ch };
        }
    }

    this.readChar();
    return tok;
  }
}

export default Lexer;
