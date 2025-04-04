import { Token, TokenType, TokenType as tk } from './tokens.js';
import { ParsingError } from './error.js';

const reserved: { [key: string]: TokenType } = {
    world: tk.WORLD,
    at: tk.AT,
    connect: tk.CONNECT,
    place: tk.PLACE,
    to: tk.TO,
    with: tk.WITH,
    playa: tk.PLAYA,
    cueva: tk.CUEVA,
    jungla: tk.JUNGLA,
};

interface ScanResult {
    errors: ParsingError[];
    tokens: Token[];
}

export default class Scanner {
    tokens: Token[];
    errors: ParsingError[];
    source: string;
    length: number;
    start: number;
    current: number;
    row: number;
    col: number;

    constructor(source: string) {
        this.tokens = [];
        this.errors = [];
        this.source = source;
        this.length = source.length;
        this.start = 0;
        this.current = 0;
        this.row = 1;
        this.col = 1;
    }

    scan(): ScanResult {
        while (!this.isAtEnd()) {
            const char = this.advance();
            switch (char) {
                case '{':
                    this.newToken(tk.LBRACKET);
                    break;
                case '}':
                    this.newToken(tk.RBRACKET);
                    break;
                case '(':
                    this.newToken(tk.LPAREN);
                    break;
                case ')':
                    this.newToken(tk.RPAREN);
                    break;
                case ':':
                    this.newToken(tk.COLON);
                    break;
                case ',':
                    this.newToken(tk.COMMA);
                    break;
                case '"':
                    this.string();
                    break;
                case '\n':
                case '\r':
                    this.row++;
                    this.col = 1;
                    break;
                case '\t':
                case ' ':
                    this.col++;
                    break;
                default:
                    if (this.isAlpha(char)) {
                        this.identifier();
                    } else if (this.isNum(char)) {
                        this.number();
                    } else {
                        this.newError('Unexpected character ' + char);
                    }
                    break;
            }
        }
        this.newToken(tk.EOF);
        return { errors: this.errors, tokens: this.tokens };
    }

    isAtEnd() {
        return this.current >= this.length;
    }

    identifier() {
        while (this.isAlpha(this.peek())) this.advance();
        let tokenType = tk.ID;
        const id = this.source.substring(this.start, this.current);
        if (id in reserved) tokenType = reserved[id];
        this.newToken(tokenType);
    }

    number() {
        while (this.isNum(this.peek())) this.advance();
        this.newToken(tk.NUM);
    }

    string() {
        while (this.peek() != '"' && !this.isAtEnd()) this.advance();
        this.advance();
        this.newToken(tk.STRING);
    }

    isAlpha(char: string): boolean {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
    }

    isNum(char: string): boolean {
        return char >= '0' && char <= '9';
    }

    peek(): string {
        if (this.isAtEnd()) return '\0';
        return this.source.charAt(this.current);
    }

    advance(): string {
        this.col++;
        return this.source.charAt(this.current++);
    }

    newToken(type: TokenType): void {
        const token = new Token(
            type,
            this.row,
            this.col,
            this.source.substring(this.start, this.current).trim()
        );
        this.tokens.push(token);
        this.start = this.current;
    }

    newError(message: string) {
        this.start = this.current;
        const error = new ParsingError(this.row, this.col, message);
        this.errors.push(error);
    }
}
