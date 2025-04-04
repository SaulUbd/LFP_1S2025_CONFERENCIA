/** @typedef {string} Type */
/**
 * Object with declarations for all nodes in the syntax tree
 * @type {{
 *  [name: string]: {
 *      [attribute: string]: Type;
 *  }
 * }}
 */
const nodes = {
    start: {
        name: 'string',
        statements: 'Statement[]',
    },
    statement: {
        statement: '(Place|Connect)',
    },
    place: {
        id: 'string',
        type: 'string',
        xCoord: 'string',
        yCoord: 'string',
    },
    connect: {
        pointA: 'string',
        pointB: 'string',
        type: 'string',
    },
};

export default nodes;
