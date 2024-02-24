// Minimum Spanning Tree

import { minDistance } from "./algorithmDijkstra"

// Problema da Árvore de Extensão Mínima, é um problema onde precisamos
// conectar os vértices da árvore a um custo mínimo, esse algoritmo resolve
// esse problema calculando a distância mínima

// A dois algoritmos para esse problema, o algoritmo de Prim e o Algoritmo de Kruskal

/**
* Algoritmo de Prim
* 
* O algoritmos de prim, é um algoritmo guloso, que resolve o problema da MST para um grafo conectado
* não direcionado com peso. Ele encontra um subconjunto de arestras que formam uma árvore,
* incluindo todos os vértices, em que o peso total de toas arestras da árvore é minimizado
*/


const graph = [
  [0,2,4,0,0,0],
  [2,0,2,4,2,0],
  [4,2,0,0,3,0],
  [0,4,0,0,3,2],
  [0,2,3,3,0,2],
  [0,0,0,2,2,0],
]


const INF = Number.MAX_SAFE_INTEGER

const prim = (graph: number[][]) => {
  const parent = []
  const key = []
  const visited = []

  const {length} = graph

  for(let i = 0; i < length; i ++) {
    key[i] = INF
    visited[i] = false
  }

  key[0] = 0
  parent[0] = 0

  for(let i = 0; i < length; i++) {
    const u = minDistance(key, visited)
    visited[u] = true
    for(let v = 0; v < length; v++) {
      if(graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
        parent[v] = u
        key[v] = graph[u][v]
      }
    } 
  }

  return parent
}

// console.log(prim(graph));

/**
  * Algoritmo de Kruskall
  * 
  * O algoritmo de kruskall também é um algoritmo guloso, que encontra a MST para um grafo conectado, não direcionado com peso
  * 
  */

const kruskall = (graph: number[][]) => {
  const {length} = graph
  const parent = []
  let ne = 0
  let a; let b; let u; let v;
  const cost = Object.freeze(graph)
  while(ne < length - 1) {
    for(let i = 0, min = INF; i < length; i++) {
      for(let j = 0; j < length; j++) {
        if(cost[i][j] < min) {
          min = cost[i][j]
          a = u = i
          b = v = j
        }
      }
    }
    u = find(u, parent)
    v = find(v, parent)
    if(union(u, v, parent)) {
      ne++
    }
    cost[a][b] = cost[b][a] = INF
  }
  return parent
}


const find = (i, parent) => {
  while(parent[i]) {
    i = parent[i]
  }
  return i
}

const union = (i, j, parent) => {
  if(i !== j) {
    parent[j] = i
    return true
  }
  return false
}

console.log(kruskall(graph));