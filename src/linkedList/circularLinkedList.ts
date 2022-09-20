import { defaultEquals } from "../util/util";
import LinkedList from "./linkedList";
import { Node } from "./node";

export default class circularLinkedList<T> extends LinkedList<T> {
    constructor(equalsFn: Function = defaultEquals) {
        super(equalsFn)
    }

    insert(element: T, index: number): boolean {
        if(index < 0 || index >= this.count) throw new Error('A posição é inválida')
        const node = new Node<T>(element)
        let current = this.head

        if(index === 0) {
            if(this.head === null) {
                this.head = node
                node.next = this.head
            } else {
                node.next = current
                current = this.getElementAt(this.size())
                this.head = node
                if (current) current.next = this.head
            }
        } else {
            const previous = this.getElementAt(index - 1)
            node.next = previous?.next
            if(previous) previous.next = node
        }
        this.count++
        return true
    }

    removeAt(index: number): T | undefined {
        if(index < 0 || index >= this.count) throw new Error('A posição é inválida')
        let current = this.head

        if(index === 0) {
            if(this.size() === 1) {
                this.head = undefined
            } else {
                const removed = this.head
                current = this.getElementAt(this.size())
                this.head = this.head?.next
                if (current) current.next = this.head
                current = removed
            }
        } else {
            let previous = this.getElementAt(index - 1)
            current = previous?.next 
            if(previous) previous.next = current?.next 
        }
        this.count--
        return current?.element
    }
}