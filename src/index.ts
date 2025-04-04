import { readFileSync } from 'node:fs';
import Scanner from './parser/scanner.js';

const filePath = process.argv[2];
const source = readFileSync(filePath, 'utf-8');
const scanner = new Scanner(source);
const tokens = scanner.scan();
console.log(tokens);
