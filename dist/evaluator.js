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
exports.evaluate = evaluate;
const ast = __importStar(require("./ast"));
const object = __importStar(require("./object"));
// Define singletons for common objects to avoid re-creating them
const NULL = new object.Null();
const TRUE = new object.Boolean(true);
const FALSE = new object.Boolean(false);
/**
 * Evaluates an AST node and returns an object.
 * @param node The AST node to evaluate.
 * @returns The resulting object.
 */
function evaluate(node) {
    if (node instanceof ast.Program) {
        return evalProgram(node);
    }
    else if (node instanceof ast.ExpressionStatement) {
        return evaluate(node.expression);
    }
    else if (node instanceof ast.IntegerLiteral) {
        return new object.Integer(node.value);
    }
    return null; // For now, return null for unsupported nodes
}
/**
 * Evaluates a program node.
 * @param program The program node to evaluate.
 * @returns The result of evaluating the last statement in the program.
 */
function evalProgram(program) {
    let result = null;
    for (const statement of program.statements) {
        result = evaluate(statement);
    }
    return result;
}
/**
 * Helper function to get a boolean object (TRUE or FALSE) based on a native boolean value.
 */
function nativeBoolToBooleanObject(input) {
    return input ? TRUE : FALSE;
}
