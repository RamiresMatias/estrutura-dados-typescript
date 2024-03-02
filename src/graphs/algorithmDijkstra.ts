// Dijkstra Algorithm
// Algoritmo guloso, utilizado para encontrar o caminho mais curto
// Entre uma origem e os vértices

import Graph from "./graph"


const graph = new Graph();

const myVertices = ["A", "B", "C", "D", "E", "F", "G"];

graph.addVertices(myVertices);

graph.addEdgeWeight({vertex1: 'A', vertex2: 'B', weight: 2});
graph.addEdgeWeight({vertex1: 'A', vertex2: 'C', weight: 6});
graph.addEdgeWeight({vertex1: 'B', vertex2: 'C', weight: 5});
graph.addEdgeWeight({vertex1: 'C', vertex2: 'D', weight: 8});
graph.addEdgeWeight({vertex1: 'B', vertex2: 'D', weight: 5});
graph.addEdgeWeight({vertex1: 'D', vertex2: 'E', weight: 15});
graph.addEdgeWeight({vertex1: 'D', vertex2: 'F', weight: 10});
graph.addEdgeWeight({vertex1: 'E', vertex2: 'F', weight: 6});
graph.addEdgeWeight({vertex1: 'F', vertex2: 'G', weight: 2});
graph.addEdgeWeight({vertex1: 'E', vertex2: 'G', weight: 6});

graph.dijkstra('A');