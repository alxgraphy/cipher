import { Token } from "./token";
export interface Node {
    tokenLiteral(): string;
    toString(): string;
}
export interface Statement extends Node {
}
export interface Expression extends Node {
}
export declare class Program implements Node {
    statements: Statement[];
    tokenLiteral(): string;
    toString(): string;
}
export declare class LetStatement implements Statement {
    token: Token;
    name: Identifier;
    value: Expression;
    constructor(token: Token, // the 'let' token
    name: Identifier, value: Expression);
    tokenLiteral(): string;
    toString(): string;
}
export declare class Identifier implements Expression {
    token: Token;
    value: string;
    constructor(token: Token, // the 'IDENT' token
    value: string);
    tokenLiteral(): string;
    toString(): string;
}
export declare class ReturnStatement implements Statement {
    token: Token;
    returnValue: Expression;
    constructor(token: Token, // the 'return' token
    returnValue: Expression);
    tokenLiteral(): string;
    toString(): string;
}
export declare class ExpressionStatement implements Statement {
    token: Token;
    expression: Expression;
    constructor(token: Token, // the first token of the expression
    expression: Expression);
    tokenLiteral(): string;
    toString(): string;
}
export declare class IntegerLiteral implements Expression {
    token: Token;
    value: number;
    constructor(token: Token, value: number);
    tokenLiteral(): string;
    toString(): string;
}
export declare class PrefixExpression implements Expression {
    token: Token;
    operator: string;
    right: Expression;
    constructor(token: Token, // The operator token, e.g., '!'
    operator: string, right: Expression);
    tokenLiteral(): string;
    toString(): string;
}
export declare class InfixExpression implements Expression {
    token: Token;
    operator: string;
    left: Expression;
    right: Expression;
    constructor(token: Token, // The operator token, e.g., '+'
    operator: string, left: Expression, right: Expression);
    tokenLiteral(): string;
    toString(): string;
}
export declare class Boolean implements Expression {
    token: Token;
    value: boolean;
    constructor(token: Token, // The 'true' or 'false' token
    value: boolean);
    tokenLiteral(): string;
    toString(): string;
}
export declare class IfExpression implements Expression {
    token: Token;
    condition: Expression | null;
    consequence: BlockStatement | null;
    alternative: BlockStatement | null;
    constructor(token: Token, // The 'if' token
    condition?: Expression | null, consequence?: BlockStatement | null, alternative?: BlockStatement | null);
    tokenLiteral(): string;
    toString(): string;
}
export declare class BlockStatement implements Statement {
    token: Token;
    statements: Statement[];
    constructor(token: Token, // The '{' token
    statements?: Statement[]);
    tokenLiteral(): string;
    toString(): string;
}
export declare class FunctionLiteral implements Expression {
    token: Token;
    parameters: Identifier[] | null;
    body: BlockStatement | null;
    constructor(token: Token, // The 'fn' token
    parameters?: Identifier[] | null, body?: BlockStatement | null);
    tokenLiteral(): string;
    toString(): string;
}
export declare class CallExpression implements Expression {
    token: Token;
    func: Expression;
    arguments: Expression[] | null;
    constructor(token: Token, // The '(' token
    func: Expression, // Identifier or FunctionLiteral
    arguments?: Expression[] | null);
    tokenLiteral(): string;
    toString(): string;
}
export declare class StringLiteral implements Expression {
    token: Token;
    value: string;
    constructor(token: Token, // The STRING token
    value: string);
    tokenLiteral(): string;
    toString(): string;
}
export declare class ArrayLiteral implements Expression {
    token: Token;
    elements: Expression[] | null;
    constructor(token: Token, // The '[' token
    elements?: Expression[] | null);
    tokenLiteral(): string;
    toString(): string;
}
export declare class IndexExpression implements Expression {
    token: Token;
    left: Expression;
    index: Expression;
    constructor(token: Token, // The '[' token
    left: Expression, index: Expression);
    tokenLiteral(): string;
    toString(): string;
}
export declare class HashLiteral implements Expression {
    token: Token;
    pairs: Map<Expression, Expression> | null;
    constructor(token: Token, // The '{' token
    pairs?: Map<Expression, Expression> | null);
    tokenLiteral(): string;
    toString(): string;
}
//# sourceMappingURL=ast.d.ts.map