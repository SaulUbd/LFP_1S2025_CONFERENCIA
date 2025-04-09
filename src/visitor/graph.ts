export default class Graph {
    declarations: string[];

    constructor() {
        this.declarations = [];
    }

    build() {
        return `digraph G {\n${this.declarations.join('\n')}\n}`;
    }

    option(attribute: string, value: string) {
        this.push(`${attribute}="${value}"`);
    }

    node(id: number, label: string) {
        this.push(`${id}[label="${label}"]`);
        return this;
    }

    edge(source: number, destination: number, label: string) {
        this.push(`${source} -> ${destination}[label="${label}"]`);
        return this;
    }

    private push(str: string) {
        this.declarations.push(str);
    }
}
