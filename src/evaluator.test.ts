import Lexer from './lexer';
import Parser from './parser';
import { evaluate } from './evaluator';
import * as object from './object';
import * as ast from './ast'; // Import ast for the program type hint

function testEval(input: string): object.BaseObject | null {
    const l = new Lexer(input);
    const p = new Parser(l);
    const program: ast.Program = p.parseProgram(); // Explicitly type program as ast.Program
    return evaluate(program);
}

describe('Evaluator', () => {
    it('should evaluate integer literals', () => {
        const tests = [
            { input: '5;', expected: 5 },
            { input: '10;', expected: 10 },
        ];

        tests.forEach(tt => {
            const evaluated = testEval(tt.input);
            expect(evaluated).not.toBeNull();
            expect(evaluated).toBeInstanceOf(object.Integer);
            expect((evaluated as object.Integer).value).toBe(tt.expected);
        });
    });
});
