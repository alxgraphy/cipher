import Parser from './parser';
import Lexer from './lexer';
import * as ast from './ast';
import { LetStatement, ReturnStatement } from './ast';

describe('Parser', () => {
    it('should parse let statements', () => {
        const input = `
            let x = 5;
            let y = 10;
            let foobar = 838383;
        `;

        const l = new Lexer(input);
        const p = new Parser(l);

        const program = p.parseProgram();
        expect(program).not.toBeNull();
        expect(program.statements.length).toBe(3);

        const expectedIdentifiers = ['x', 'y', 'foobar'];

        expectedIdentifiers.forEach((ident, i) => {
            const stmt = program.statements[i];
            expect(stmt.tokenLiteral()).toBe('let');
            
            const letStmt = stmt as LetStatement;
            expect(letStmt.name.value).toBe(ident);
            expect(letStmt.name.tokenLiteral()).toBe(ident);
        });
    });

    it('should report errors on invalid let statements', () => {
        const input = `
            let x 5;
            let = 10;
            let 838383;
        `;

        const l = new Lexer(input);
        const p = new Parser(l);

        p.parseProgram();
        const errors = p.getErrors();
        expect(errors.length).not.toBe(0);
    });

    it('should parse return statements', () => {
        const input = `
            return 5;
            return 10;
            return 993322;
        `;

        const l = new Lexer(input);
        const p = new Parser(l);

        const program = p.parseProgram();
        expect(program).not.toBeNull();
        expect(program.statements.length).toBe(3);

        program.statements.forEach(stmt => {
            expect(stmt.tokenLiteral()).toBe('return');
            const returnStmt = stmt as ReturnStatement;
            expect(returnStmt).toBeInstanceOf(ReturnStatement);
        });
    });
});
