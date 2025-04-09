import IVisitor from '../parser/interfaces/Visitor.js';
import { Start, Statement, Place, Connect } from '../parser/SyntaxTree.js';
import Graph from './graph.js';

export default class DotVisitor implements IVisitor<Graph> {
    graph: Graph;
    places: { [place: string]: number };

    constructor() {
        this.graph = new Graph();
        this.places = {};
    }

    visitStart(node: Start): Graph {
        this.graph.option('label', node.name);
        this.graph.option('labelloc', 't');
        node.statements.forEach((stmt) => stmt.accept(this));
        return this.graph;
    }

    visitStatement(node: Statement): Graph {
        return node.statement.accept(this);
    }

    visitPlace(node: Place): Graph {
        const place = node.name;
        if (place in this.places) throw new Error(place + ' already exists');
        this.places[place] = node.dotId;
        return this.graph.node(node.dotId, `${node.name}\\ntipo:${node.type}`);
    }

    visitConnect(node: Connect): Graph {
        const IdPointA = this.places[node.pointA];
        const IdPointB = this.places[node.pointB];

        return this.graph.edge(IdPointA, IdPointB, node.type);
    }
}
