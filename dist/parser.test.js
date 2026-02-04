"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("./parser"));
const lexer_1 = __importDefault(require("./lexer"));
const ast_1 = require("./ast");
describe('Parser', () => {
    it('should parse let statements', () => {
        const input = `
            let x = 5;
            let y = 10;
            let foobar = 838383;
        `;
        const l = new lexer_1.default(input);
        const p = new parser_1.default(l);
        const program = p.parseProgram();
        expect(program).not.toBeNull();
        expect(program.statements.length).toBe(3);
        const expectedIdentifiers = ['x', 'y', 'foobar'];
        expectedIdentifiers.forEach((ident, i) => {
            const stmt = program.statements[i];
            expect(stmt.tokenLiteral()).toBe('let');
            const letStmt = stmt;
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
        const l = new lexer_1.default(input);
        const p = new parser_1.default(l);
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
        const l = new lexer_1.default(input);
        const p = new parser_1.default(l);
        const program = p.parseProgram();
        expect(program).not.toBeNull();
        expect(program.statements.length).toBe(3);
        program.statements.forEach(stmt => {
            expect(stmt.tokenLiteral()).toBe('return');
            const returnStmt = stmt;
            expect(returnStmt).toBeInstanceOf(ast_1.ReturnStatement);
        });
    });
});
