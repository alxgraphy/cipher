import * as readline from 'readline';
import Lexer from './lexer';
import Parser from './parser';
import { evaluate } from './evaluator';
import { ObjectType, BaseObject } from './object';
import * as ast from './ast';

const PROMPT = '>> ';

function printParserErrors(errors: string[]): void {
  errors.forEach(err => console.log(`	${err}`));
}

function startRepl(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: PROMPT,
  });

  rl.prompt();

  rl.on('line', (line) => {
    if (line.trim() === 'exit') {
      rl.close();
      return;
    }

    const l = new Lexer(line);
    const p = new Parser(l);
    const program: ast.Program = p.parseProgram();

    if (p.getErrors().length !== 0) {
      printParserErrors(p.getErrors());
      rl.prompt();
      return;
    }

    const evaluated = evaluate(program);
    if (evaluated) {
      console.log(evaluated.inspect());
    } else {
        // This case should ideally not happen if evaluation always returns an object
        // but for now, we'll explicitly handle it.
        console.log("Evaluation resulted in no object.");
    }

    rl.prompt();
  }).on('close', () => {
    console.log('Exiting Cipher REPL.');
    process.exit(0);
  });
}

// Start the REPL when the script is run
startRepl();
