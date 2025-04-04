import IVisitor from './Visitor.js';

export default interface INode {
    accept<T>(visitor: IVisitor<T>): T;
}
