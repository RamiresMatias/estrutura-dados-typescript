import { Dictionary } from "../dictionaryAndHashmaps/dictionary"
import { Queue } from "../queueDeque/queue"
import { ColorsGraph } from "../util/util"

export default class Graph {
  private isDirected: boolean = false
  private vertices: string[] = []
  private adjList: Dictionary

  constructor(isDirected: boolean = false) {
    this.isDirected = isDirected
    this.adjList = new Dictionary()
  }

  addVertex(v: string) {
    if(!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }

  addEdge(v: string, w: string) {
    // Verifica se estão presentes no grafo
    // Se não os adiciona
    if(!this.adjList.get(v)) this.addVertex(v)
    if(!this.adjList.get(w)) this.addVertex(w)
    
    // Adiciona uma arestra ligando o vértice V e W
    this.adjList.get(v).push(w)
    if(!this.isDirected) {
      this.adjList.get(w).push(v)
    }
  }

  getVertices() { return this.vertices }

  getAdjList() { return this.adjList }

  toString() {
    let s = ''
    for(let i = 0; i < this.vertices.length; i++) {

      s += `${this.vertices[i]} -> `
      const neighbors = this.adjList.get(this.vertices[i])

      for(let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]}`
      }
      s += '\n'
    }
    return s
  }
}

/**
 * Inicializa os vértices do grafo com cores, para marcar se foi visitado e validado
 * WHITE - Não visitado
 * GREY - Descoberto
 * BLACK - Explorado
 * @param vertices 
 * @returns 
 */
const initializeColor = (vertices: string[]) => {
  const color: any = {}
  for(let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = ColorsGraph.WHITE
  }
  return color
}


/**
 * Função que faz a busca em largura
 * @param graph 
 * @param startVertex 
 * @param callback 
 */
export const breadthFirstSearch = (graph: Graph, startVertex: string, callback?: Function) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue()
  queue.enqueue(startVertex)
  
  while(!queue.isEmpty()) {
    const u = queue.dequeue() as any
    const neightbors = adjList.get(u)
    color[u] = ColorsGraph.GREY

    for(let i = 0; i < neightbors.length; i++) {
      const w = neightbors[i]
      if(color[w] === ColorsGraph.WHITE) {
        color[w] = ColorsGraph.GREY
        queue.enqueue(w)
      }
    }
    color[u] = ColorsGraph.BLACK
    if(callback) callback(u)
  }
}

/**
 * Método que percorre o grafo e retorna as distâncias em arestras de um vértice até outro 
 * @param graph
 * @param startVertex 
 * @returns
 */
const BFS = (graph: Graph, startVertex: string) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue<string>()
  const distances: any = {} 
  const predecessors: any = {}
  queue.enqueue(startVertex)
  
  for(let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0
    predecessors[vertices[i]] = null
  }

  while(!queue.isEmpty()) {
    const u = queue.dequeue() as string
    const neightbors = adjList.get(u)
    color[u] = ColorsGraph.GREY
    for(let i = 0; i < neightbors.length; i++) {
      const w = neightbors[i]
      if(color[w] === ColorsGraph.WHITE) {
        color[w] = ColorsGraph.GREY
        distances[w] = distances[u] + 1
        predecessors[w] = u
        queue.enqueue(w)
      }
    }
    color[u] = ColorsGraph.BLACK
  }
  return {
    distances,
    predecessors
  }
}


const graph = new Graph()
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for(let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// console.log(graph.toString())

// const printVertex = (value: any) => console.log('Visited vertex: ' + value);
// breadthFirstSearch(graph, myVertices[0], printVertex)

const shortesPathA = BFS(graph, myVertices[0])

var fromVertex = myVertices[0];
for (let i = 0; i < myVertices.length; i++) {
  const toVertex = myVertices[i];
  const path = [];
  for (let v = toVertex; v !== fromVertex; v = shortesPathA.predecessors[v]) {
    path.push(v);
  }
  path.push(fromVertex);
  let s = path.pop();
  while (path.length) {
    s += ' - ' + path.pop()
  }
  console.log(s);
}
