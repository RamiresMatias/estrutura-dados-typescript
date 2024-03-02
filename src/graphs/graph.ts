import { Dictionary } from "../dictionaryAndHashmaps/dictionary";
import { Queue } from "../queueDeque/queue";
import { ColorsGraph } from "../types/types";
import { INF, initializeColor } from "../util/util";

export default class Graph {
  private isDirected: boolean = false;
  private vertices: string[] = [];
  private adjList: Dictionary;

  constructor(isDirected: boolean = false) {
    this.isDirected = isDirected;
    this.adjList = new Dictionary();
  }

  addVertices(myVertices: any[]) {
    for (let i = 0; i < myVertices.length; i++) {
      this.addVertex(myVertices[i]);
    }
  }

  addVertex(vertex: string) {
    if (!this.vertices.includes(vertex)) {
      this.vertices.push(vertex);
      this.adjList.set(vertex, {});
    }
  }

  addEdgeWeight({vertex1, vertex2, weight}: {vertex1: string, vertex2: string, weight: number}) {
    if(Number.isNaN(weight)) return
    this.adjList.get(vertex1)[vertex2] = weight
  }

  addEdge(v: string, w: string) {
    // Verifica se estão presentes no grafo
    // Se não os adiciona
    if (!this.adjList.get(v)) this.addVertex(v);
    if (!this.adjList.get(w)) this.addVertex(w);

    // Adiciona uma arestra ligando o vértice V e W
    this.adjList.get(v).push(w);
    if (!this.isDirected) {
      this.adjList.get(w).push(v);
    }
  }

  // Retorna os vertices do grafo
  getVertices() {
    return this.vertices;
  }

  // Retorna o vértice e seus valores
  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]);

      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]}`;
      }
      s += "\n";
    }
    return s;
  }

  /**
   * Função que faz a busca em largura
   * visitando os vértices e marcando com as cores GREY os visitados
   * e os explorados como BLACK
   * @param graph
   * @param startVertex
   * @param callback
   */
  breadthFirstSearch = (startVertex: string, callback?: Function) => {
    const vertices = this.getVertices();
    const adjList = this.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue();
    queue.enqueue(startVertex);

    while (!queue.isEmpty()) {
      const u = queue.dequeue() as any;
      const neightbors = adjList.get(u);
      color[u] = ColorsGraph.GREY;

      for (let i = 0; i < neightbors.length; i++) {
        const w = neightbors[i];
        if (color[w] === ColorsGraph.WHITE) {
          color[w] = ColorsGraph.GREY;
          queue.enqueue(w);
        }
      }
      color[u] = ColorsGraph.BLACK;
      if (callback) callback(u);
    }
  };

  /**
   * Função que faz a busca em profundidade
   * visitando os vértices e marcando com as cores GREY os visitados
   * e os explorados como BLACK
   * @param graph
   * @param callback
   */
  depthFirstSearch = (callback?: Function) => {
    const vertices = this.getVertices();
    const adjList = this.getAdjList();
    const color = initializeColor(vertices);

    for (let i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === ColorsGraph.WHITE) {
        this.depthFirstSearchVisit(vertices[i], color, adjList, callback);
      }
    }
  };

  depthFirstSearchVisit = (
    u: string,
    color: any,
    adjList: Dictionary,
    callback?: Function
  ) => {
    color[u] = ColorsGraph.GREY;
    if (callback) callback(u);

    const neightbors = adjList.get(u);
    for (let i = 0; i < neightbors.length; i++) {
      const w = neightbors[i];
      if (color[w] === ColorsGraph.WHITE) {
        this.depthFirstSearchVisit(w, color, adjList, callback);
      }
    }
    color[u] = ColorsGraph.BLACK;
  };

  /**
   * Método que percorre o grafo e retorna as distâncias em arestras de um vértice até outro
   * usando o algoritmo de busca em largura
   * @param graph
   * @param startVertex
   * @returns
   */
  BFS = (startVertex: string) => {
    const vertices = this.getVertices();
    const adjList = this.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue<string>();
    const distances: any = {};
    const predecessors: any = {};
    queue.enqueue(startVertex);

    for (let i = 0; i < vertices.length; i++) {
      distances[vertices[i]] = 0;
      predecessors[vertices[i]] = null;
    }

    while (!queue.isEmpty()) {
      const u = queue.dequeue() as string;
      const neightbors = adjList.get(u);
      color[u] = ColorsGraph.GREY;
      for (let i = 0; i < neightbors.length; i++) {
        const w = neightbors[i];
        if (color[w] === ColorsGraph.WHITE) {
          color[w] = ColorsGraph.GREY;
          distances[w] = distances[u] + 1;
          predecessors[w] = u;
          queue.enqueue(w);
        }
      }
      color[u] = ColorsGraph.BLACK;
    }
    return {
      distances,
      predecessors,
    };
  };

  /**
   * Percorre o grafo usando o algoritmo de busca em profundidade e gravando
   * os vértices e arestras visitas no instante da descoberta
   * @param graph
   * @returns
   */
  DFS = () => {
    const vertices = this.getVertices();
    const adjList = this.getAdjList();
    const color = initializeColor(vertices);

    const d: any = {};
    const f: any = {};
    const p: any = {};
    const time = { count: 0 };
    for (let i = 0; i < vertices.length; i++) {
      f[vertices[i]] = 0;
      d[vertices[i]] = 0;
      p[vertices[i]] = null;
    }

    for (let i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] == ColorsGraph.WHITE) {
        this.DFSVisit(vertices[i], color, d, f, p, time, adjList);
      }
    }

    return {
      discovery: d,
      finished: f,
      predecessors: p,
    };
  };

  DFSVisit = (
    u: string,
    color: any,
    d: any,
    f: any,
    p: any,
    time: { count: number },
    adjList: Dictionary
  ) => {
    color[u] = ColorsGraph.GREY;
    d[u] = ++time.count;
    const neightbors = adjList.get(u);
    for (let i = 0; i < neightbors.length; i++) {
      const w = neightbors[i];
      if (color[w] === ColorsGraph.WHITE) {
        p[w] = u;
        this.DFSVisit(w, color, d, f, p, time, adjList);
      }
    }
    color[u] = ColorsGraph.BLACK;
    f[u] = ++time.count;
  };

  dijkstra(source: any) {
    const visited = new Set()
    const distances = {}
    const parents = {}
    const {length} = this.vertices

    for(let i = 0; i < length; i++) {
      distances[this.vertices[i]] = INF
      visited[this.vertices[i]] = false
      parents[this.vertices[i]] = null
    }

    distances[source] = 0
    let currentVertex = this.vertexMinDistance(distances, visited)

    while(currentVertex !== null) {
      
      let distance = distances[currentVertex]
      const neighbors = this.getAdjList().get(currentVertex)
      visited.add(currentVertex)

      for (const neighbor in neighbors) {

        const newDistance = distance + +neighbors[neighbor]

        if (distances[neighbor] > newDistance) {
          distances[neighbor] = newDistance
          parents[neighbor] = currentVertex
        }
      }
      currentVertex = this.vertexMinDistance(distances, visited)
    }

    return distances
  }

  vertexMinDistance(distances: {}, visited: Set<any>) {
    let minDistance = INF
    let minVertex = null
    for(const vertex in distances) {
      const distance = distances[vertex]
      if(distance <= minDistance && !visited.has(vertex)) {
        minDistance = distance
        minVertex = vertex
      }
    }
    return minVertex
  }
}



// const graph = new Graph();
// const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
// for (let i = 0; i < myVertices.length; i++) {
//   graph.addVertex(myVertices[i]);
// }

// graph.addEdge("A", "B");
// graph.addEdge("A", "D");
// graph.addEdge("A", "C");
// graph.addEdge("C", "D");
// graph.addEdge("C", "G");
// graph.addEdge("D", "G");
// graph.addEdge("D", "H");
// graph.addEdge("B", "E");
// graph.addEdge("B", "F");
// graph.addEdge("E", "I");

// console.log(graph.toString())

// const printVertex = (value: any) => console.log("Visited vertex: " + value);
// graph.breadthFirstSearch(myVertices[0], printVertex)
// graph.depthFirstSearch(printVertex)

// console.log(graph.DFS());

// const shortesPathA = graph.BFS(myVertices[0]);
// var fromVertex = myVertices[0];
// for (let i = 0; i < myVertices.length; i++) {
//   const toVertex = myVertices[i];
//   const path = [];
//   for (let v = toVertex; v !== fromVertex; v = shortesPathA.predecessors[v]) {
//     path.push(v);
//   }
//   path.push(fromVertex);
//   let s = path.pop();
//   while (path.length) {
//     s += " - " + path.pop();
//   }
//   console.log(s);
// }
