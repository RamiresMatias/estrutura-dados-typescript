const INF = Number.MAX_SAFE_INTEGER

export function defaultEquals(a: any, b: any): boolean {
  return a === b
}

export const minDistance = (dist: any[], visited: any[]) => {
  let min = INF
  let minIndex = -1
  for(let v = 0; v < dist.length; v++) {
    if(visited[v] === false && dist[v] <= min) {
      min = dist[v]
      minIndex = v
    }
  }
  return minIndex
}

