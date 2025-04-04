
// Auto-generated
import INode from './interfaces/Node.js';
import IVisitor from './interfaces/Visitor.js';

export class Start implements INode {
    name: string;
	statements: Statement[];

    constructor(name: string, statements: Statement[]) {
        this.name = name;
		this.statements = statements;
    }

    accept<T>(visitor: IVisitor<T>): T {
        return visitor.visitStart(this);
    }
}
    
export class Statement implements INode {
    statement: (Place|Connect);

    constructor(statement: (Place|Connect)) {
        this.statement = statement;
    }

    accept<T>(visitor: IVisitor<T>): T {
        return visitor.visitStatement(this);
    }
}
    
export class Place implements INode {
    id: string;
	type: string;
	xCoord: string;
	yCoord: string;

    constructor(id: string, type: string, xCoord: string, yCoord: string) {
        this.id = id;
		this.type = type;
		this.xCoord = xCoord;
		this.yCoord = yCoord;
    }

    accept<T>(visitor: IVisitor<T>): T {
        return visitor.visitPlace(this);
    }
}
    
export class Connect implements INode {
    pointA: string;
	pointB: string;
	type: string;

    constructor(pointA: string, pointB: string, type: string) {
        this.pointA = pointA;
		this.pointB = pointB;
		this.type = type;
    }

    accept<T>(visitor: IVisitor<T>): T {
        return visitor.visitConnect(this);
    }
}
    