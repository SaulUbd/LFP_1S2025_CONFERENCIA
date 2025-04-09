// Generar clases para arbol de sintaxis
// Este archivo genera las clases necesarias para implementar el patrón visitante con Typescript

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import nodes from './nodes.js';

const __dirname = import.meta.dirname;
const classesDestination = '../src/parser/SyntaxTree.ts';
const visitorDestination = '../src/parser/interfaces/Visitor.ts';

/**
 * returns PascalCase representation of a String
 * @param {string} str
 */
function getPascalCase(str) {
    return str.replace(
        /(\w)(\w*)/g,
        (_, first, rest) => first.toUpperCase() + rest.toLowerCase()
    );
}

let codeString = `
// Auto-generated
import INode from './Node.js';

export default interface IVisitor<T> {

`;
for (const node of Object.keys(nodes)) {
    codeString += `\tvisit${getPascalCase(node)}(node: INode): T;\n`;
}
codeString += `}`;

writeFileSync(path.join(__dirname, visitorDestination), codeString);
console.log('Generated visitor Interface');

codeString = `
// Auto-generated
import INode from './interfaces/Node.js';
import IVisitor from './interfaces/Visitor.js';
`;
for (const [name, args] of Object.entries(nodes)) {
    console.log(`Generating ${name} node`);
    const argKeys = Object.keys(args);
    codeString += `
export class ${getPascalCase(name)} implements INode {
    ${argKeys.map((arg) => `${arg}: ${args[arg]};`).join('\n\t')}
    dotId: number;

    constructor(dotId: number, ${argKeys
        .map((arg) => `${arg}: ${args[arg]}`)
        .join(', ')}) {
        ${argKeys.map((arg) => `this.${arg} = ${arg};`).join('\n\t\t')}
        this.dotId = dotId;
    }

    accept<T>(visitor: IVisitor<T>): T {
        return visitor.visit${getPascalCase(name)}(this);
    }
}
    `;
}

writeFileSync(path.join(__dirname, classesDestination), codeString);
console.log('Done!');
