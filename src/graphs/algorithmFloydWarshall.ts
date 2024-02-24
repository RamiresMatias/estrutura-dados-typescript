// Floyd Warshall Algorithm

// O algoritmo de Floyd é um algoritmo de programação dinâmica
// para calcular todos os caminhos mais curtos em um grafo
// Com isso, podemos encontrar todos os caminhos mais curtos a partir
// de todas as origens para todos os vértices

const graph = [
  [0,2,4,0,0,0],
  [0,0,1,4,2,0],
  [0,0,0,0,3,0],
  [0,0,0,0,0,2],
  [0,0,0,3,0,2],
  [0,0,0,0,0,0],
]

const floydWarshall = (graph: number[][]) => {
  const dist: number[][] = []
  const {length} = graph
  for(let i = 0; i < length; i++) {
    dist[i] = []
    for(let j = 0; j < length; j++) {
      if(i === j) {
        dist[i][j] = 0
      } else if (!isFinite(graph[i][j])) {
        dist[i][j] = Infinity
      } else {
        dist[i][j] = graph[i][j]
      }
    }
  }

  for(let k = 0; k < length; k++) {
    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length; j++) {
        if(dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j]
        }
      }
    }
  }

  return dist
}

console.log(floydWarshall(graph));