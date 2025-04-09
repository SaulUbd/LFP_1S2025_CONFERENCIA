import IVisitor from './Visitor.js';

export default interface INode {
    dotId: number;
    accept<T>(visitor: IVisitor<T>): T;
}
