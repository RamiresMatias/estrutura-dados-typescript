// Dijkstra Algorithm

import { minDistance } from "../util/util"
import Graph from "./graph"

// Algoritmo guloso, utilizado para encontrar o caminho mais curto
// Entre uma origem e os vértices 

// const graph = [
//   [0,2,4,0,0,0],
//   [0,0,1,4,2,0],
//   [0,0,0,0,3,0],
//   [0,0,0,0,0,2],
//   [0,0,0,3,0,2],
//   [0,0,0,0,0,0],
// ]

// const INF = Number.MAX_SAFE_INTEGER

// const dijkstra = (graph: number[][], src: number) => {
//   const dist = []
//   const visited = []
//   const { length } = graph
//   for(let i = 0; i < length; i++) {
//     dist[i] = INF
//     visited[i] = false
//   }
//   dist[src] = 0
//   for(let i = 0; i < length - 1; i++) {
//     const u = minDistance(dist, visited)
//     visited[u] = true
//     for(let v = 0; v < length; v++) {
//       if(
//           !visited[v] && 
//           graph[u][v] !== 0 && 
//           dist[u] !== INF && 
//           dist[u] + graph[u][v] < dist[v]
//         ) {
//         dist[v] = dist[u] + graph[u][v]
//       }
//     }
//   }

//   return dist
// }

// console.log(dijkstra(graph, 0));

const graph = new Graph()

const myVertices = ["0", "1", "2", "3", "4", "5", "6"];

graph.addVertices(myVertices)

graph.addEdge("0", "1");
graph.addEdge("0", "2");
graph.addEdge("1", "3");
graph.addEdge("2", "3");
graph.addEdge("3", "5");
graph.addEdge("3", "4");
graph.addEdge("4", "5");
graph.addEdge("4", "6");
graph.addEdge("5", "6");

console.log(graph.toString())