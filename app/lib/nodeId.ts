let nodeIdCounter = 0;

export function createNodeId(prefix: string): string {
  nodeIdCounter += 1;
  return `${prefix}_${nodeIdCounter}`;
}
