import { Token, TokenType, TokenType as tk } from './tokens.js';
import { Connect, Place, Start, Statement } from './SyntaxTree.js';
import { ParseError, ParsingError } from './error.js';

export default class Parser {
    tokens: Token[];
    errors: ParsingError[];
    current: number;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.errors = [];
        this.current = 0;
    }

    parse() {
        try {
            return this.start();
        } catch (error) {
            return this.errors;
        }
    }

    /**
     * start:  "world" STRING "{" statement+ "}"
     */
    private start(): Start {
        this.consume(tk.WORLD, 'expected "world"');
        this.consume(tk.STRING, 'expected String');
        const id = this.previous();
        this.consume(tk.LBRACKET, 'expected "{"');
        const stmts: Statement[] = [];
        while (!this.check(tk.RBRACKET) && !this.isAtEnd()) {
            const stmt = this.statement();
            if (stmt) stmts.push(stmt);
        }
        this.consume(tk.RBRACKET, 'expected "}"');
        return new Start(id.getText().replaceAll('"', ''), stmts);
    }

    // RULES

    /**
     * statement:   place | connect
     */
    private statement(): Statement | null {
        try {
            if (this.check(tk.PLACE)) return new Statement(this.place());
            if (this.check(tk.CONNECT)) return new Statement(this.connect());
            throw this.error(`exptected "place" or "connect"`);
        } catch (error) {
            this.sync();
            return null;
        }
    }

    /**
     * place:   "place" ID ":" placeType "at" "(" NUM "," NUM ")"
     */
    private place(): Place {
        this.consume(tk.PLACE, 'expected "place"');
        const id = this.consume(tk.ID, 'exptected Identifier');
        this.consume(tk.COLON, 'expected :');
        const pType = this.placeType();
        this.consume(tk.AT, 'expected "at"');
        this.consume(tk.LPAREN, 'expected "("');
        const xCoord = this.consume(tk.NUM, 'expected Number');
        this.consume(tk.COMMA, 'expected ","');
        const yCoord = this.consume(tk.NUM, 'expected Number');
        this.consume(tk.RPAREN, 'expected ")"');
        return new Place(
            id.getText(),
            pType.getText(),
            xCoord.getText(),
            yCoord.getText()
        );
    }

    private placeType(): Token {
        if (!this.match(tk.JUNGLA, tk.CUEVA, tk.PLAYA))
            throw this.error('expected valid place');
        return this.previous();
    }

    /**
     * connect: "connect" ID "to" ID "with" STRING
     */
    private connect(): Connect {
        this.consume(tk.CONNECT, 'expected "connect"');
        const pointA = this.consume(tk.ID, 'exptected Identifier');
        this.consume(tk.TO, 'expected "to"');
        const pointB = this.consume(tk.ID, 'exptected Identifier');
        this.consume(tk.WITH, 'expected "with"');
        const road = this.consume(tk.STRING, 'expected String');
        return new Connect(
            pointA.getText(),
            pointB.getText(),
            road.getText().replaceAll('"', '')
        );
    }

    // UTILITIES

    /**
     * Synchronize the parser to a valid state
     * @returns
     */
    private sync() {
        this.advance(); // consume the token that produced the error

        while (!this.isAtEnd()) {
            switch (this.previous().type) {
                case tk.PLACE:
                case tk.CONNECT:
                    return;
                default:
                    break;
            }
            this.advance();
        }
    }

    private error(message: string) {
        const token = this.peek();
        this.errors.push(new ParsingError(token.row, token.col, message));
        return new ParseError();
    }

    /**
     * Check wheter the current token is of `type` and consumes it,
     * or throws an error if not
     * @returns The last consumed token
     * @throws {ParseError}
     */
    private consume(type: TokenType, errMsg: string): Token {
        if (this.check(type)) return this.advance();
        throw this.error(errMsg);
    }

    /**
     * Check if current token is in the valid set of `types`, and consumes it.
     *
     * This is useful when a token is optional in the grammar
     * @param types The types to check against
     */
    private match(...types: TokenType[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }

    /**
     * Check if current token is of `type`
     * @param type
     */
    private check(type: TokenType): boolean {
        if (this.isAtEnd()) return false;
        return this.peek().type === type;
    }

    /**
     * Consumes a token and returns it. It updates the internal pointer
     * to the next available token
     * @returns The consumed token
     */
    private advance(): Token {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    /**
     * Checks if we are at EOF
     */
    private isAtEnd(): boolean {
        return this.peek().type === tk.EOF;
    }

    /**
     * Gets the current token but doesn't consume it
     * @returns Current token
     */
    private peek(): Token {
        return this.tokens[this.current];
    }

    /**
     * Gets the most recently consumed token
     * @returns The token
     */
    private previous(): Token {
        return this.tokens[this.current - 1];
    }
}
