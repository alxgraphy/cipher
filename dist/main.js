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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const lexer_1 = __importDefault(require("./lexer"));
const parser_1 = __importDefault(require("./parser"));
const evaluator_1 = require("./evaluator");
const PROMPT = '>> ';
function printParserErrors(errors) {
    errors.forEach(err => console.log(`	${err}`));
}
function startRepl() {
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
        const l = new lexer_1.default(line);
        const p = new parser_1.default(l);
        const program = p.parseProgram();
        if (p.getErrors().length !== 0) {
            printParserErrors(p.getErrors());
            rl.prompt();
            return;
        }
        const evaluated = (0, evaluator_1.evaluate)(program);
        if (evaluated) {
            console.log(evaluated.inspect());
        }
        else {
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
