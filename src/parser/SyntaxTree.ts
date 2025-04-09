
// Auto-generated
import INode from './interfaces/Node.js';
import IVisitor from './interfaces/Visitor.js';

export class Start implements INode {
    name: string;
	statements: Statement[];
    dotId: number;

    constructor(dotId: number, name: string, statements: Statement[]) {
        this.name = name;
		this.statements = statements;
        this.dotId = dotId;
    }

    accept<T>(visitor: IVisitor<T>): T {
        return visitor.visitStart(this);
    }
}
    
export class Statement implements INode {
    statement: (Place|Connect);
    dotId: number;

    constructor(dotId: number, statement: (Place|Connect)) {
        this.statement = statement;
        this.dotId = dotId;
    }

    accept<T>(visitor: IVisitor<T>): T {
        return visitor.visitStatement(this);
    }
}
    
export class Place implements INode {
    name: string;
	type: string;
	xCoord: string;
	yCoord: string;
    dotId: number;

    constructor(dotId: number, name: string, type: string, xCoord: string, yCoord: string) {
        this.name = name;
		this.type = type;
		this.xCoord = xCoord;
		this.yCoord = yCoord;
        this.dotId = dotId;
    }

    accept<T>(visitor: IVisitor<T>): T {
        return visitor.visitPlace(this);
    }
}
    
export class Connect implements INode {
    pointA: string;
	pointB: string;
	type: string;
    dotId: number;

    constructor(dotId: number, pointA: string, pointB: string, type: string) {
        this.pointA = pointA;
		this.pointB = pointB;
		this.type = type;
        this.dotId = dotId;
    }

    accept<T>(visitor: IVisitor<T>): T {
        return visitor.visitConnect(this);
    }
}
    