
// Auto-generated
import INode from './Node.js';

export default interface IVisitor<T> {

	visitStart(node: INode): T;
	visitStatement(node: INode): T;
	visitPlace(node: INode): T;
	visitConnect(node: INode): T;
}