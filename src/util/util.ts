import { ColorsGraph } from "../types/types";

export const INF = Number.MAX_SAFE_INTEGER;

export function defaultEquals(a: any, b: any): boolean {
  return a === b;
}

export const minDistance = (dist: any[], visited: any[]) => {
  let min = INF;
  let minIndex = -1;
  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }
  return minIndex;
};

/**
 * Inicializa os vértices do grafo com cores, para marcar se foi visitado e validado
 * WHITE - Não visitado
 * GREY - Descoberto
 * BLACK - Explorado
 * @param vertices
 * @returns
 */
export const initializeColor = (vertices: string[]) => {
  const color: any = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = ColorsGraph.WHITE;
  }
  return color;
};
