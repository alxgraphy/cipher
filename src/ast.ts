import { Token } from "./token";

// Base interface for all nodes in the AST
export interface Node {
  tokenLiteral(): string;
  toString(): string;
}

// Base interface for all statement nodes
export interface Statement extends Node {}

// Base interface for all expression nodes
export interface Expression extends Node {}

// The root of the AST
export class Program implements Node {
  public statements: Statement[] = [];

  public tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral();
    } else {
      return "";
    }
  }

  public toString(): string {
    return this.statements.map((s) => s.toString()).join("");
  }
}

// Represents a 'let' statement, e.g., `let x = 5;`
export class LetStatement implements Statement {
  constructor(
    public token: Token, // the 'let' token
    public name: Identifier,
    public value: Expression
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    let out = `${this.tokenLiteral()} ${this.name.toString()} = `;
    if (this.value) {
      out += this.value.toString();
    }
    out += ";";
    return out;
  }
}

// Represents an identifier, e.g., a variable name
export class Identifier implements Expression {
  constructor(
    public token: Token, // the 'IDENT' token
    public value: string
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    return this.value;
  }
}

// Represents a return statement, e.g., `return 5;`
export class ReturnStatement implements Statement {
  constructor(
    public token: Token, // the 'return' token
    public returnValue: Expression
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    let out = `${this.tokenLiteral()} `;
    if (this.returnValue) {
      out += this.returnValue.toString();
    }
    out += ";";
    return out;
  }
}

// Represents a statement that consists of a single expression, e.g., `x + 10;`
export class ExpressionStatement implements Statement {
  constructor(
    public token: Token, // the first token of the expression
    public expression: Expression
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    if (this.expression) {
      return this.expression.toString();
    }
    return "";
  }
}

// Represents an integer literal, e.g., `5`
export class IntegerLiteral implements Expression {
    constructor(
        public token: Token,
        public value: number
    ) {}

    public tokenLiteral(): string {
        return this.token.literal;
    }

    public toString(): string {
        return this.token.literal;
    }
}

// Represents a prefix expression, e.g., `!5` or `-10`
export class PrefixExpression implements Expression {
  constructor(
    public token: Token, // The operator token, e.g., '!'
    public operator: string,
    public right: Expression
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    return `(${this.operator}${this.right.toString()})`;
  }
}

// Represents an infix expression, e.g., `5 + 5` or `x * y`
export class InfixExpression implements Expression {
  constructor(
    public token: Token, // The operator token, e.g., '+'
    public operator: string,
    public left: Expression,
    public right: Expression
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    return `(${this.left.toString()} ${this.operator} ${this.right.toString()})`;
  }
}

// Represents a boolean literal, e.g., `true` or `false`
export class Boolean implements Expression {
  constructor(
    public token: Token, // The 'true' or 'false' token
    public value: boolean
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    return this.token.literal;
  }
}

// Represents an `if` expression, e.g., `if (x < y) { x } else { y }`
export class IfExpression implements Expression {
  constructor(
    public token: Token, // The 'if' token
    public condition: Expression | null = null,
    public consequence: BlockStatement | null = null,
    public alternative: BlockStatement | null = null
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
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

// Represents a block statement, e.g., the body of an `if` or `fn` expression
export class BlockStatement implements Statement {
  constructor(
    public token: Token, // The '{' token
    public statements: Statement[] = []
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    return this.statements.map((s) => s.toString()).join("");
  }
}

// Represents a function literal, e.g., `fn(x, y) { x + y; }`
export class FunctionLiteral implements Expression {
  constructor(
    public token: Token, // The 'fn' token
    public parameters: Identifier[] | null = null,
    public body: BlockStatement | null = null
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    const params = this.parameters ? this.parameters.map((p) => p.toString()).join(", ") : "";
    const body = this.body ? this.body.toString() : "";
    return `${this.tokenLiteral()}(${params})${body}`;
  }
}

// Represents a function call expression, e.g., `add(2, 3)`
export class CallExpression implements Expression {
  constructor(
    public token: Token, // The '(' token
    public func: Expression, // Identifier or FunctionLiteral
    public args: Expression[] | null = null
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    const args = this.args ? this.args.map((a) => a.toString()).join(", ") : "";
    return `${this.func.toString()}(${args})`;
  }
}

// Represents a string literal, e.g., `"hello world"`
export class StringLiteral implements Expression {
  constructor(
    public token: Token, // The STRING token
    public value: string
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    return this.token.literal; // The literal already includes quotes
  }
}

// Represents an array literal, e.g., `[1, 2, "three"]`
export class ArrayLiteral implements Expression {
  constructor(
    public token: Token, // The '[' token
    public elements: Expression[] | null = null
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    const elements = this.elements ? this.elements.map((el) => el.toString()).join(", ") : "";
    return `[${elements}]`;
  }
}

// Represents an index expression, e.g., `myArray[0]`
export class IndexExpression implements Expression {
  constructor(
    public token: Token, // The '[' token
    public left: Expression,
    public index: Expression
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    return `(${this.left.toString()}[${this.index.toString()}])`;
  }
}

// Represents a hash (map) literal, e.g., `{"key": "value", 1: 2}`
export class HashLiteral implements Expression {
  constructor(
    public token: Token, // The '{' token
    public pairs: Map<Expression, Expression> | null = null
  ) {}

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public toString(): string {
    if (!this.pairs) {
        return "{}";
    }
    const pairs = Array.from(this.pairs.entries()).map(([key, value]) => `${key.toString()}:${value.toString()}`);
    return `{${pairs.join(", ")}}`;
  }
}