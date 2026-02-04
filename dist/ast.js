"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashLiteral = exports.IndexExpression = exports.ArrayLiteral = exports.StringLiteral = exports.CallExpression = exports.FunctionLiteral = exports.BlockStatement = exports.IfExpression = exports.Boolean = exports.InfixExpression = exports.PrefixExpression = exports.IntegerLiteral = exports.ExpressionStatement = exports.ReturnStatement = exports.Identifier = exports.LetStatement = exports.Program = void 0;
// The root of the AST
class Program {
    constructor() {
        this.statements = [];
    }
    tokenLiteral() {
        if (this.statements.length > 0) {
            return this.statements[0].tokenLiteral();
        }
        else {
            return "";
        }
    }
    toString() {
        return this.statements.map((s) => s.toString()).join("");
    }
}
exports.Program = Program;
// Represents a 'let' statement, e.g., `let x = 5;`
class LetStatement {
    constructor(token, // the 'let' token
    name, value) {
        this.token = token;
        this.name = name;
        this.value = value;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        let out = `${this.tokenLiteral()} ${this.name.toString()} = `;
        if (this.value) {
            out += this.value.toString();
        }
        out += ";";
        return out;
    }
}
exports.LetStatement = LetStatement;
// Represents an identifier, e.g., a variable name
class Identifier {
    constructor(token, // the 'IDENT' token
    value) {
        this.token = token;
        this.value = value;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        return this.value;
    }
}
exports.Identifier = Identifier;
// Represents a return statement, e.g., `return 5;`
class ReturnStatement {
    constructor(token, // the 'return' token
    returnValue) {
        this.token = token;
        this.returnValue = returnValue;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        let out = `${this.tokenLiteral()} `;
        if (this.returnValue) {
            out += this.returnValue.toString();
        }
        out += ";";
        return out;
    }
}
exports.ReturnStatement = ReturnStatement;
// Represents a statement that consists of a single expression, e.g., `x + 10;`
class ExpressionStatement {
    constructor(token, // the first token of the expression
    expression) {
        this.token = token;
        this.expression = expression;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        if (this.expression) {
            return this.expression.toString();
        }
        return "";
    }
}
exports.ExpressionStatement = ExpressionStatement;
// Represents an integer literal, e.g., `5`
class IntegerLiteral {
    constructor(token, value) {
        this.token = token;
        this.value = value;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        return this.token.literal;
    }
}
exports.IntegerLiteral = IntegerLiteral;
// Represents a prefix expression, e.g., `!5` or `-10`
class PrefixExpression {
    constructor(token, // The operator token, e.g., '!'
    operator, right) {
        this.token = token;
        this.operator = operator;
        this.right = right;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        return `(${this.operator}${this.right.toString()})`;
    }
}
exports.PrefixExpression = PrefixExpression;
// Represents an infix expression, e.g., `5 + 5` or `x * y`
class InfixExpression {
    constructor(token, // The operator token, e.g., '+'
    operator, left, right) {
        this.token = token;
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        return `(${this.left.toString()} ${this.operator} ${this.right.toString()})`;
    }
}
exports.InfixExpression = InfixExpression;
// Represents a boolean literal, e.g., `true` or `false`
class Boolean {
    constructor(token, // The 'true' or 'false' token
    value) {
        this.token = token;
        this.value = value;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        return this.token.literal;
    }
}
exports.Boolean = Boolean;
// Represents an `if` expression, e.g., `if (x < y) { x } else { y }`
class IfExpression {
    constructor(token, // The 'if' token
    condition = null, consequence = null, alternative = null) {
        this.token = token;
        this.condition = condition;
        this.consequence = consequence;
        this.alternative = alternative;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        let out = `if${this.condition ? this.condition.toString() : ""}`;
        if (this.consequence) {
            out += ` ${this.consequence.toString()}`;
        }
        if (this.alternative) {
            out += ` else ${this.alternative.toString()}`;
        }
        return out;
    }
}
exports.IfExpression = IfExpression;
// Represents a block statement, e.g., the body of an `if` or `fn` expression
class BlockStatement {
    constructor(token, // The '{' token
    statements = []) {
        this.token = token;
        this.statements = statements;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        return this.statements.map((s) => s.toString()).join("");
    }
}
exports.BlockStatement = BlockStatement;
// Represents a function literal, e.g., `fn(x, y) { x + y; }`
class FunctionLiteral {
    constructor(token, // The 'fn' token
    parameters = null, body = null) {
        this.token = token;
        this.parameters = parameters;
        this.body = body;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        const params = this.parameters ? this.parameters.map((p) => p.toString()).join(", ") : "";
        const body = this.body ? this.body.toString() : "";
        return `${this.tokenLiteral()}(${params})${body}`;
    }
}
exports.FunctionLiteral = FunctionLiteral;
// Represents a function call expression, e.g., `add(2, 3)`
class CallExpression {
    constructor(token, // The '(' token
    func, // Identifier or FunctionLiteral
    args = null) {
        this.token = token;
        this.func = func;
        this.args = args;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        const args = this.args ? this.args.map((a) => a.toString()).join(", ") : "";
        return `${this.func.toString()}(${args})`;
    }
}
exports.CallExpression = CallExpression;
// Represents a string literal, e.g., `"hello world"`
class StringLiteral {
    constructor(token, // The STRING token
    value) {
        this.token = token;
        this.value = value;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        return this.token.literal; // The literal already includes quotes
    }
}
exports.StringLiteral = StringLiteral;
// Represents an array literal, e.g., `[1, 2, "three"]`
class ArrayLiteral {
    constructor(token, // The '[' token
    elements = null) {
        this.token = token;
        this.elements = elements;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        const elements = this.elements ? this.elements.map((el) => el.toString()).join(", ") : "";
        return `[${elements}]`;
    }
}
exports.ArrayLiteral = ArrayLiteral;
// Represents an index expression, e.g., `myArray[0]`
class IndexExpression {
    constructor(token, // The '[' token
    left, index) {
        this.token = token;
        this.left = left;
        this.index = index;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        return `(${this.left.toString()}[${this.index.toString()}])`;
    }
}
exports.IndexExpression = IndexExpression;
// Represents a hash (map) literal, e.g., `{"key": "value", 1: 2}`
class HashLiteral {
    constructor(token, // The '{' token
    pairs = null) {
        this.token = token;
        this.pairs = pairs;
    }
    tokenLiteral() {
        return this.token.literal;
    }
    toString() {
        if (!this.pairs) {
            return "{}";
        }
        const pairs = Array.from(this.pairs.entries()).map(([key, value]) => `${key.toString()}:${value.toString()}`);
        return `{${pairs.join(", ")}}`;
    }
}
exports.HashLiteral = HashLiteral;
