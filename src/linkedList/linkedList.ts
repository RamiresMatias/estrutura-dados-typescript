import { defaultEquals } from "../util/util";
import { DoublyNode } from "./doublyNode";
import { Node } from "./node";

export default class LinkedList<T> {

    protected count: number = 0
    protected head: Node<T> | DoublyNode<T> | undefined = undefined

    constructor(
        public equalsFn: Function = defaultEquals
    ) {}

    push(element: T): void {
        const node = new Node<T>(element)
        let current: Node<T> | undefined

        if(this.head === undefined) {
            this.head = node
        } else {
            current = this.head

            while (current?.next != undefined) {
                current = current.next
            }
            if(current) current.next = node
        }
        this.count++
    }

    removeAt(index: number): T | undefined {

        if(index < 0 || index >= this.count) throw new Error('A posição é inválida')

        let current = this.head

        if(index === 0) {
            this.head = current?.next || undefined
        } else {
            let previous = this.getElementAt(index - 1)
            current = previous?.next 
            if(previous) previous.next = current?.next 
        }
        this.count--
        return current?.element
    }

    getElementAt(index: number): Node<T> | undefined {
        if(index < 0 || index >= this.count) return undefined

        let node = this.head
        for(let i = 0; i < index && node !== undefined; i++) {
            node = node?.next
        }
        return node
    }

    insert(element: T, index: number): boolean {
        if(index < 0 || index >= this.count) throw new Error('A posição é inválida')
        const node = new Node<T>(element)

        if(index === 0) {
            const current = this.head
            node.next = current
            this.head = node
        } else {
            const previous = this.getElementAt(index - 1)
            const current = previous?.next
            node.next = current
            if(previous) previous.next = node
        }

        this.count++
        return true
    }

    indexOf(element: T): number {
        let current = this.head

        for(let i = 0; i< this.count && current != null; i++) {
            if(this.equalsFn(element, current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }

    remove(element: T): T | undefined {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }

    isEmpty(): boolean {
        return this.size() === 0
    }

    size(): number {
        return this.count
    }

    getHead(): Node<T> | undefined {
        return this.head
    }

    toString(): string {
        if(!this.head) return ''

        let objString = `${this.head.element}`
        let current = this.head.next
        for(let i = 1; i < this.size() && current !== undefined; i++) {
            objString = `${objString}, ${current.element}`
            current = current.next
        }

        return objString
    }
}