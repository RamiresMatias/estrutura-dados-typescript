import { Dictionary } from "../dictionaryAndHashmaps/dictionary"

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

const graph = new Graph()
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for(let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log(graph.toString())