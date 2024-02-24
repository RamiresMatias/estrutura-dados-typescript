function factorial(n: number): number {
    if(n === 1 || n === 0) return 1
    
    return n * factorial(n - 1)
}

function fibonacci(n: number): number {
    if(n < 1) return 0
    if(n <= 2) return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
}

const visited: {[key: number]: number} = {}
function fibonacciOptimized(n: number): number {
    if(n in visited) return visited[n]
    else if(n < 2) return n
    else {
        visited[n] = fibonacci(n - 1) + fibonacci(n - 2)
        return visited[n]
    }
    
}