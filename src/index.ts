import { readFileSync } from 'node:fs';
import Scanner from './parser/scanner.js';
import Parser from './parser/parser.js';

const filePath = process.argv[2];
const source = readFileSync(filePath, 'utf-8');
const scanner = new Scanner(source);
const scanResult = scanner.scan();
console.log(scanResult);
const parser = new Parser(scanResult.tokens);
const tree = parser.parse();
console.log(tree);
