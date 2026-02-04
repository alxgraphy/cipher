"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const token = __importStar(require("./token"));
class Lexer {
    constructor(input) {
        this.position = 0; // current position in input (points to current char)
        this.readPosition = 0; // current reading position in input (after current char)
        this.ch = ""; // current char under examination
        this.input = input;
        this.readChar();
    }
    /**
     * Reads the next character from the input and advances the position pointers.
     */
    readChar() {
        if (this.readPosition >= this.input.length) {
            this.ch = ""; // NUL byte in ASCII, signifies "end of file"
        }
        else {
            this.ch = this.input[this.readPosition];
        }
        this.position = this.readPosition;
        this.readPosition += 1;
    }
    /**
     * Returns the next character without consuming it.
     */
    peekChar() {
        if (this.readPosition >= this.input.length) {
            return "";
        }
        else {
            return this.input[this.readPosition];
        }
    }
    /**
     * Skips over any whitespace characters.
     */
    skipWhitespace() {
        while (/\s/.test(this.ch)) {
            this.readChar();
        }
    }
    /**
     * Reads an identifier (e.g., variable name, function name).
     */
    readIdentifier() {
        const startPosition = this.position;
        while (this.isLetter(this.ch)) {
            this.readChar();
        }
        return this.input.substring(startPosition, this.position);
    }
    /**
     * Reads a number literal.
     */
    readNumber() {
        const startPosition = this.position;
        while (this.isDigit(this.ch)) {
            this.readChar();
        }
        return this.input.substring(startPosition, this.position);
    }
    /**
     * Reads a string literal.
     */
    readString() {
        const startPosition = this.position + 1; // Skip the opening "
        do {
            this.readChar();
        } while (this.ch !== '"' && this.ch !== "");
        return this.input.substring(startPosition, this.position);
    }
    isLetter(ch) {
        return /^[a-zA-Z_]$/.test(ch);
    }
    isDigit(ch) {
        return /^\d$/.test(ch);
    }
    /**
     * Returns the next token from the input.
     */
    nextToken() {
        let tok;
        this.skipWhitespace();
        switch (this.ch) {
            case "=":
                if (this.peekChar() === "=") {
                    const ch = this.ch;
                    this.readChar();
                    const literal = ch + this.ch;
                    tok = { type: token.EQ, literal };
                }
                else {
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
                }
                else {
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
                }
                else {
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
                }
                else {
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
                }
                else if (this.isDigit(this.ch)) {
                    const literal = this.readNumber();
                    return { type: token.INT, literal }; // Early return
                }
                else {
                    tok = { type: token.ILLEGAL, literal: this.ch };
                }
        }
        this.readChar();
        return tok;
    }
}
exports.default = Lexer;
