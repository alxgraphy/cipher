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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = __importDefault(require("./lexer"));
const token = __importStar(require("./token"));
describe('Lexer', () => {
    it('should tokenize basic operators and delimiters', () => {
        const input = '=+(){},;';
        const tests = [
            [token.ASSIGN, '='],
            [token.PLUS, '+'],
            [token.LPAREN, '('],
            [token.RPAREN, ')'],
            [token.LBRACE, '{'],
            [token.RBRACE, '}'],
            [token.COMMA, ','],
            [token.SEMICOLON, ';'],
            [token.EOF, ''],
        ];
        const l = new lexer_1.default(input);
        tests.forEach(([expectedType, expectedLiteral]) => {
            const tok = l.nextToken();
            expect(tok.type).toBe(expectedType);
            expect(tok.literal).toBe(expectedLiteral);
        });
    });
    it('should tokenize a simple script', () => {
        const input = `let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);
`;
        const tests = [
            [token.LET, 'let'],
            [token.IDENT, 'five'],
            [token.ASSIGN, '='],
            [token.INT, '5'],
            [token.SEMICOLON, ';'],
            [token.LET, 'let'],
            [token.IDENT, 'ten'],
            [token.ASSIGN, '='],
            [token.INT, '10'],
            [token.SEMICOLON, ';'],
            [token.LET, 'let'],
            [token.IDENT, 'add'],
            [token.ASSIGN, '='],
            [token.FUNCTION, 'fn'],
            [token.LPAREN, '('],
            [token.IDENT, 'x'],
            [token.COMMA, ','],
            [token.IDENT, 'y'],
            [token.RPAREN, ')'],
            [token.LBRACE, '{'],
            [token.IDENT, 'x'],
            [token.PLUS, '+'],
            [token.IDENT, 'y'],
            [token.SEMICOLON, ';'],
            [token.RBRACE, '}'],
            [token.SEMICOLON, ';'],
            [token.LET, 'let'],
            [token.IDENT, 'result'],
            [token.ASSIGN, '='],
            [token.IDENT, 'add'],
            [token.LPAREN, '('],
            [token.IDENT, 'five'],
            [token.COMMA, ','],
            [token.IDENT, 'ten'],
            [token.RPAREN, ')'],
            [token.SEMICOLON, ';'],
            [token.EOF, ''],
        ];
        const l = new lexer_1.default(input);
        tests.forEach(([expectedType, expectedLiteral]) => {
            const tok = l.nextToken();
            expect(tok.type).toBe(expectedType);
            expect(tok.literal).toBe(expectedLiteral);
        });
    });
    it('should tokenize advanced operators and keywords', () => {
        const input = `!-/*5;
5 < 10 > 5;

if (5 < 10) {
	return true;
} else {
	return false;
}

10 == 10;
10 != 9;
"foobar"
"foo bar"
[1, 2];
{"foo": "bar"}
1 |> 2;
`;
        const tests = [
            [token.BANG, '!'],
            [token.MINUS, '-'],
            [token.SLASH, '/'],
            [token.ASTERISK, '*'],
            [token.INT, '5'],
            [token.SEMICOLON, ';'],
            [token.INT, '5'],
            [token.LT, '<'],
            [token.INT, '10'],
            [token.GT, '>'],
            [token.INT, '5'],
            [token.SEMICOLON, ';'],
            [token.IF, 'if'],
            [token.LPAREN, '('],
            [token.INT, '5'],
            [token.LT, '<'],
            [token.INT, '10'],
            [token.RPAREN, ')'],
            [token.LBRACE, '{'],
            [token.RETURN, 'return'],
            [token.TRUE, 'true'],
            [token.SEMICOLON, ';'],
            [token.RBRACE, '}'],
            [token.ELSE, 'else'],
            [token.LBRACE, '{'],
            [token.RETURN, 'return'],
            [token.FALSE, 'false'],
            [token.SEMICOLON, ';'],
            [token.RBRACE, '}'],
            [token.INT, '10'],
            [token.EQ, '=='],
            [token.INT, '10'],
            [token.SEMICOLON, ';'],
            [token.INT, '10'],
            [token.NOT_EQ, '!='],
            [token.INT, '9'],
            [token.SEMICOLON, ';'],
            [token.STRING, 'foobar'],
            [token.STRING, 'foo bar'],
            [token.LBRACKET, '['],
            [token.INT, '1'],
            [token.COMMA, ','],
            [token.INT, '2'],
            [token.RBRACKET, ']'],
            [token.SEMICOLON, ';'],
            [token.LBRACE, '{'],
            [token.STRING, 'foo'],
            [token.COLON, ':'],
            [token.STRING, 'bar'],
            [token.RBRACE, '}'],
            [token.INT, '1'],
            [token.PIPE, '|>'],
            [token.INT, '2'],
            [token.SEMICOLON, ';'],
            [token.EOF, ''],
        ];
        const l = new lexer_1.default(input);
        tests.forEach(([expectedType, expectedLiteral]) => {
            const tok = l.nextToken();
            expect(tok.type).toBe(expectedType);
            expect(tok.literal).toBe(expectedLiteral);
        });
    });
});
