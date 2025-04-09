import { readFileSync, writeFileSync } from 'node:fs';
import Scanner from './parser/scanner.js';
import Parser from './parser/parser.js';
import DotVisitor from './visitor/dot-visitor.js';

const filePath = process.argv[2];
const source = readFileSync(filePath, 'utf-8');
const scanner = new Scanner(source);
const scanResult = scanner.scan();
console.log('===Resultados de lexer===');
console.log(scanResult);
if (scanResult.errors.length != 0) {
    console.error('>>> Hubo errores en el escaneo');
    process.exit(1);
}
const parser = new Parser(scanResult.tokens);
const parseResult = parser.parse();
console.log('===Resultados de parser===');
console.log(parseResult);
if (!parseResult.parseTree) {
    console.error('>>> Hubo errores en el parseo');
    process.exit(1);
}

const graphBuilder = parseResult.parseTree.accept(new DotVisitor());
const dotStr = graphBuilder.build();
console.log('===Codigo dot generado===');
console.log(dotStr);
writeFileSync('output.dot', dotStr, 'utf-8');
console.log('guardando en ./output.dot');
