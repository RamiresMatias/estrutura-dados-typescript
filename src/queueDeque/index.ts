import { Deque } from "./deque";
import { Queue } from "./queue";

// Fila Circular - Batata Quente
function hotPotato(elementsList: string[], num: number) {
    const queue = new Queue<string>()
    const elimitatedList = []

    elementsList.forEach((el) => queue.enqueue(el))


    while(queue.size() > 1) {
        for(let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue() ?? '')
        }
        elimitatedList.push(queue.dequeue())
    }

    return {
        eliminated: elimitatedList,
        winner: queue.dequeue()
    }
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
const result = hotPotato(names, 10)

