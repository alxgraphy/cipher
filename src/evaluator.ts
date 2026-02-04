import * as ast from "./ast";
import * as object from "./object";

// Define singletons for common objects to avoid re-creating them
const NULL = new object.Null();
const TRUE = new object.Boolean(true);
const FALSE = new object.Boolean(false);

/**
 * Evaluates an AST node and returns an object.
 * @param node The AST node to evaluate.
 * @returns The resulting object.
 */
export function evaluate(node: ast.Node): object.BaseObject | null {
  if (node instanceof ast.Program) {
    return evalProgram(node);
  } else if (node instanceof ast.ExpressionStatement) {
    return evaluate(node.expression);
  } else if (node instanceof ast.IntegerLiteral) {
    return new object.Integer(node.value);
  }

  return null; // For now, return null for unsupported nodes
}

/**
 * Evaluates a program node.
 * @param program The program node to evaluate.
 * @returns The result of evaluating the last statement in the program.
 */
function evalProgram(program: ast.Program): object.BaseObject | null {
  let result: object.BaseObject | null = null;
  for (const statement of program.statements) {
    result = evaluate(statement);
  }
  return result;
}

/**
 * Helper function to get a boolean object (TRUE or FALSE) based on a native boolean value.
 */
function nativeBoolToBooleanObject(input: boolean): object.Boolean {
  return input ? TRUE : FALSE;
}
