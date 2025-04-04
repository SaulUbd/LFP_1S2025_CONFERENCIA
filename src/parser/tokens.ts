export enum TokenType {
    LBRACKET,
    RBRACKET,
    LPAREN,
    RPAREN,
    COLON,
    COMMA,
    PLAYA,
    CUEVA,
    JUNGLA,
    WORLD,
    AT,
    PLACE,
    CONNECT,
    TO,
    WITH,
    STRING,
    ID,
    NUM,
    EOF,
}

export class Token {
    type: TokenType;
    row: number;
    col: number;
    private lexeme: string;

    constructor(type: TokenType, row: number, col: number, lexeme: string) {
        this.type = type;
        this.row = row;
        this.col = col;
        this.lexeme = lexeme;
    }

    getText() {
        return this.lexeme;
    }
}
