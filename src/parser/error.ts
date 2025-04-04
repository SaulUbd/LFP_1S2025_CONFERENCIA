export class ParsingError {
    row: number;
    col: number;
    message: string;

    constructor(row: number, col: number, message: string) {
        this.row = row;
        this.col = col;
        this.message = message;
    }

    toString() {
        return `Error at line ${this.row}:${this.col}, ${this.message}`;
    }
}

export class ParseError extends Error {}
