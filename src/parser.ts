import Lexer from "./lexer";
import * as token from "./token";
import * as ast from "./ast";

// Define operator precedence levels
enum Precedence {
  _ = 0, // Lowest precedence
  EQUALS, // ==
  LESSGREATER, // > or <
  SUM, // +
  PRODUCT, // *
  PREFIX, // -X or !X
  CALL, // myFunction(X)
  INDEX, // array[index]
}

// Map token types to their precedence levels
const precedences: { [key: string]: Precedence } = {
  [token.EQ]: Precedence.EQUALS,
  [token.NOT_EQ]: Precedence.EQUALS,
  [token.LT]: Precedence.LESSGREATER,
  [token.GT]: Precedence.LESSGREATER,
  [token.PLUS]: Precedence.SUM,
  [token.MINUS]: Precedence.SUM,
  [token.SLASH]: Precedence.PRODUCT,
  [token.ASTERISK]: Precedence.PRODUCT,
  // [token.LPAREN]: Precedence.CALL, // For function calls
  // [token.LBRACKET]: Precedence.INDEX, // For array indexing
};

type prefixParseFn = () => ast.Expression | null;
type infixParseFn = (expr: ast.Expression) => ast.Expression | null;

class Parser {
  private l: Lexer;
  private errors: string[] = [];

  private curToken: token.Token;
  private peekToken: token.Token;

  private prefixParseFns = new Map<token.TokenType, prefixParseFn>();
  private infixParseFns = new Map<token.TokenType, infixParseFn>();

  constructor(lexer: Lexer) {
    this.l = lexer;
    // Initialize curToken and peekToken to satisfy strict property initialization
    this.curToken = { type: token.EOF, literal: "" };
    this.peekToken = { type: token.EOF, literal: "" };

    this.nextToken();
    this.nextToken(); // Initialize curToken and peekToken with actual tokens

    this.registerPrefix(token.IDENT, this.parseIdentifier);
    this.registerPrefix(token.INT, this.parseIntegerLiteral);
    this.registerPrefix(token.BANG, this.parsePrefixExpression);
    this.registerPrefix(token.MINUS, this.parsePrefixExpression);
    this.registerPrefix(token.TRUE, this.parseBoolean);
    this.registerPrefix(token.FALSE, this.parseBoolean);
    this.registerPrefix(token.LPAREN, this.parseGroupedExpression);
    this.registerPrefix(token.IF, this.parseIfExpression);
    this.registerPrefix(token.FUNCTION, this.parseFunctionLiteral);
    this.registerPrefix(token.STRING, this.parseStringLiteral);
    this.registerPrefix(token.LBRACKET, this.parseArrayLiteral);
    this.registerPrefix(token.LBRACE, this.parseHashLiteral);


    this.registerInfix(token.PLUS, this.parseInfixExpression);
    this.registerInfix(token.MINUS, this.parseInfixExpression);
    this.registerInfix(token.SLASH, this.parseInfixExpression);
    this.registerInfix(token.ASTERISK, this.parseInfixExpression);
    this.registerInfix(token.EQ, this.parseInfixExpression);
    this.registerInfix(token.NOT_EQ, this.parseInfixExpression);
    this.registerInfix(token.LT, this.parseInfixExpression);
    this.registerInfix(token.GT, this.parseInfixExpression);
    this.registerInfix(token.LPAREN, this.parseCallExpression); // For function calls
    this.registerInfix(token.LBRACKET, this.parseIndexExpression); // For array indexing
  }

  public getErrors(): string[] {
    return this.errors;
  }

  private peekError(t: token.TokenType): void {
    const msg = `expected next token to be ${t}, got ${this.peekToken.type} instead`;
    this.errors.push(msg);
  }

  private nextToken(): void {
    this.curToken = this.peekToken;
    this.peekToken = this.l.nextToken();
  }

  public parseProgram(): ast.Program {
    const program = new ast.Program();

    while (this.curToken.type !== token.EOF) {
      const stmt = this.parseStatement();
      if (stmt) {
        program.statements.push(stmt);
      }
      this.nextToken();
    }

    return program;
  }

  private parseStatement(): ast.Statement | null {
    switch (this.curToken.type) {
      case token.LET:
        return this.parseLetStatement();
      case token.RETURN:
        return this.parseReturnStatement();
      default:
        return this.parseExpressionStatement(); // Default to expression statement
    }
  }

  private parseLetStatement(): ast.LetStatement | null {
    const stmt = new ast.LetStatement(this.curToken, null!, null!);

    if (!this.expectPeek(token.IDENT)) {
      return null;
    }

    stmt.name = new ast.Identifier(this.curToken, this.curToken.literal);

    if (!this.expectPeek(token.ASSIGN)) {
      return null;
    }

    this.nextToken(); // Advance to the start of the expression

    const value = this.parseExpression(Precedence._);
    if (!value) {
        return null;
    }
    stmt.value = value;

    if (this.peekTokenIs(token.SEMICOLON)) {
      this.nextToken();
    }

    return stmt;
  }

  private parseReturnStatement(): ast.ReturnStatement | null {
    const stmt = new ast.ReturnStatement(this.curToken, null!);

    this.nextToken();

    const returnValue = this.parseExpression(Precedence._);
    if (!returnValue) {
        return null;
    }
    stmt.returnValue = returnValue;

    if (this.peekTokenIs(token.SEMICOLON)) {
      this.nextToken();
    }
    
    return stmt;
  }

  private parseExpressionStatement(): ast.ExpressionStatement | null {
    const stmt = new ast.ExpressionStatement(this.curToken, null!);
    const expression = this.parseExpression(Precedence._);
    if (!expression) {
        return null;
    }
    stmt.expression = expression;

    if (this.peekTokenIs(token.SEMICOLON)) {
      this.nextToken(); // Consume the semicolon
    }

    return stmt;
  }

  private parseExpression(precedence: Precedence): ast.Expression | null {
    const prefix = this.prefixParseFns.get(this.curToken.type);
    if (!prefix) {
      this.noPrefixParseFnError(this.curToken.type);
      return null;
    }
    let leftExp = prefix();

    while (!this.peekTokenIs(token.SEMICOLON) && precedence < this.peekPrecedence()) {
      const infix = this.infixParseFns.get(this.peekToken.type);
      if (!infix) {
        return leftExp;
      }
      this.nextToken();
      leftExp = infix(leftExp!);
    }
    return leftExp;
  }

  // --- Prefix Parsing Functions ---
  private parseIdentifier(): ast.Expression {
    return new ast.Identifier(this.curToken, this.curToken.literal);
  }

  private parseIntegerLiteral(): ast.Expression | null {
    const lit = new ast.IntegerLiteral(this.curToken, 0); // Initialize with 0
    const value = parseInt(this.curToken.literal, 10);

    if (isNaN(value)) {
      this.errors.push(`could not parse ${this.curToken.literal} as integer`);
      return null;
    }

    lit.value = value;
    return lit;
  }

  private parsePrefixExpression(): ast.Expression | null {
    const expression = new ast.PrefixExpression(
      this.curToken,
      this.curToken.literal,
      null!
    );
    this.nextToken();
    const right = this.parseExpression(Precedence.PREFIX);
    if (!right) {
        return null;
    }
    expression.right = right;
    return expression;
  }
  
  private parseBoolean(): ast.Expression {
      return new ast.Boolean(this.curToken, this.curTokenIs(token.TRUE));
  }

  private parseGroupedExpression(): ast.Expression | null {
      this.nextToken();
      const exp = this.parseExpression(Precedence._);
      if (!exp) {
          return null;
      }
      if (!this.expectPeek(token.RPAREN)) {
          return null;
      }
      return exp;
  }

  private parseIfExpression(): ast.Expression | null {
      const expression = new ast.IfExpression(this.curToken);
      if (!this.expectPeek(token.LPAREN)) {
          return null;
      }
      this.nextToken();
      const condition = this.parseExpression(Precedence._);
      if (!condition) {
          return null;
      }
      expression.condition = condition;

      if (!this.expectPeek(token.RPAREN)) {
          return null;
      }
      if (!this.expectPeek(token.LBRACE)) {
          return null;
      }
      const consequence = this.parseBlockStatement();
      if (!consequence) { // parseBlockStatement can return null if no closing brace
          return null;
      }
      expression.consequence = consequence;

      if (this.peekTokenIs(token.ELSE)) {
          this.nextToken();
          if (!this.expectPeek(token.LBRACE)) {
              return null;
          }
          const alternative = this.parseBlockStatement();
          if (!alternative) { // parseBlockStatement can return null if no closing brace
              return null;
          }
          expression.alternative = alternative;
      }
      return expression;
  }

  private parseFunctionLiteral(): ast.Expression | null {
      const lit = new ast.FunctionLiteral(this.curToken);
      if (!this.expectPeek(token.LPAREN)) {
          return null;
      }
      lit.parameters = this.parseFunctionParameters();
      if (lit.parameters === null) { // parseFunctionParameters might return null
          return null;
      }
      if (!this.expectPeek(token.LBRACE)) {
          return null;
      }
      const body = this.parseBlockStatement();
      if (!body) {
          return null;
      }
      lit.body = body;
      return lit;
  }

  private parseFunctionParameters(): ast.Identifier[] | null {
      const identifiers: ast.Identifier[] = [];
      if (this.peekTokenIs(token.RPAREN)) {
          this.nextToken();
          return identifiers;
      }
      this.nextToken();
      let ident = new ast.Identifier(this.curToken, this.curToken.literal);
      identifiers.push(ident);

      while (this.peekTokenIs(token.COMMA)) {
          this.nextToken();
          this.nextToken();
          ident = new ast.Identifier(this.curToken, this.curToken.literal);
          identifiers.push(ident);
      }
      if (!this.expectPeek(token.RPAREN)) {
          return null;
      }
      return identifiers;
  }

  private parseBlockStatement(): ast.BlockStatement | null {
      const block = new ast.BlockStatement(this.curToken);
      this.nextToken(); // Consume LBRACE

      while (!this.curTokenIs(token.RBRACE) && !this.curTokenIs(token.EOF)) {
          const stmt = this.parseStatement();
          if (stmt) {
              block.statements.push(stmt);
          }
          this.nextToken();
      }
      if (!this.curTokenIs(token.RBRACE)) { // Ensure block is closed, otherwise it's an error
          this.errors.push("Expected '}' to close block statement.");
          return null;
      }
      return block;
  }
  
  private parseStringLiteral(): ast.Expression {
      return new ast.StringLiteral(this.curToken, this.curToken.literal);
  }

  private parseArrayLiteral(): ast.Expression | null {
      const array = new ast.ArrayLiteral(this.curToken);
      array.elements = this.parseExpressionList(token.RBRACKET);
      if (array.elements === null) {
          return null;
      }
      return array;
  }

  private parseExpressionList(end: token.TokenType): ast.Expression[] | null {
      const list: ast.Expression[] = [];
      if (this.peekTokenIs(end)) {
          this.nextToken();
          return list;
      }
      this.nextToken();
      const firstExp = this.parseExpression(Precedence._);
      if (!firstExp) {
          return null;
      }
      list.push(firstExp);

      while (this.peekTokenIs(token.COMMA)) {
          this.nextToken();
          this.nextToken();
          const nextExp = this.parseExpression(Precedence._);
          if (!nextExp) {
              return null;
          }
          list.push(nextExp);
      }
      if (!this.expectPeek(end)) {
          return null;
      }
      return list;
  }

  private parseHashLiteral(): ast.Expression | null {
      const hash = new ast.HashLiteral(this.curToken);
      const pairs = this.parseHashPairs();
      if (pairs === null) {
          return null;
      }
      hash.pairs = pairs;
      return hash;
  }

  private parseHashPairs(): Map<ast.Expression, ast.Expression> | null {
      const pairs = new Map<ast.Expression, ast.Expression>();
      if (this.peekTokenIs(token.RBRACE)) {
          this.nextToken();
          return pairs;
      }
      this.nextToken();
      const key = this.parseExpression(Precedence._);
      if (!key) return null;
      if (!this.expectPeek(token.COLON)) {
          return null;
      }
      this.nextToken();
      const value = this.parseExpression(Precedence._);
      if (!value) return null;
      pairs.set(key, value);

      while (this.peekTokenIs(token.COMMA)) {
          this.nextToken();
          this.nextToken();
          const nextKey = this.parseExpression(Precedence._);
          if (!nextKey) return null;
          if (!this.expectPeek(token.COLON)) {
              return null;
          }
          this.nextToken();
          const nextValue = this.parseExpression(Precedence._);
          if (!nextValue) return null;
          pairs.set(nextKey, nextValue);
      }
      if (!this.expectPeek(token.RBRACE)) {
          return null;
      }
      return pairs;
  }


  // --- Infix Parsing Functions ---
  private parseInfixExpression(left: ast.Expression): ast.Expression | null {
    const expression = new ast.InfixExpression(
      this.curToken,
      this.curToken.literal,
      left,
      null!
    );
    const precedence = this.curPrecedence();
    this.nextToken();
    const right = this.parseExpression(precedence);
    if (!right) {
        return null;
    }
    expression.right = right;
    return expression;
  }

  private parseCallExpression(func: ast.Expression): ast.Expression | null {
      const exp = new ast.CallExpression(this.curToken, func);
      exp.args = this.parseExpressionList(token.RPAREN); // Renamed arguments to args
      if (exp.args === null) {
          return null;
      }
      return exp;
  }

  private parseIndexExpression(left: ast.Expression): ast.Expression | null {
      const exp = new ast.IndexExpression(this.curToken, left, null!);
      this.nextToken();
      const index = this.parseExpression(Precedence._);
      if (!index) {
          return null;
      }
      exp.index = index;
      if (!this.expectPeek(token.RBRACKET)) {
          return null;
      }
      return exp;
  }


  // --- Helper Functions ---
  private curTokenIs(t: token.TokenType): boolean {
    return this.curToken.type === t;
  }

  private peekTokenIs(t: token.TokenType): boolean {
    return this.peekToken.type === t;
  }

  private expectPeek(t: token.TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken();
      return true;
    } else {
      this.peekError(t);
      return false;
    }
  }

  private peekPrecedence(): Precedence {
    return precedences[this.peekToken.type] || Precedence._;
  }

  private curPrecedence(): Precedence {
    return precedences[this.curToken.type] || Precedence._;
  }

  private noPrefixParseFnError(t: token.TokenType): void {
    const msg = `no prefix parse function for ${t} found`;
    this.errors.push(msg);
  }

  private registerPrefix(tokenType: token.TokenType, fn: prefixParseFn): void {
    this.prefixParseFns.set(tokenType, fn.bind(this));
  }

  private registerInfix(tokenType: token.TokenType, fn: infixParseFn): void {
    this.infixParseFns.set(tokenType, fn.bind(this));
  }
}

export default Parser;