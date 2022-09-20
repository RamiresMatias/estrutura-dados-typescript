import { defaultEquals } from "../util/util";
import LinkedList from "./linkedList";
import { DoublyNode } from "./doublyNode";

export default class DoublyLinkedList<T> extends LinkedList<T> {

    private tail: any = undefined
    protected head: DoublyNode<T> | undefined = undefined

    constructor(equalsFn: Function = defaultEquals) {
        super(equalsFn)
    }

    insert(element: T, index: number): boolean {
        if(index < 0 || index >= this.count) throw new Error('A posição é inválida')
        const node = new DoublyNode<T>(element)
        let current = this.head as DoublyNode<T>

        if(index === 0) {
            if(this.head === null) {
                this.head = node
                this.tail = node
            } else {
                node.next = this.head
                current.prev = node
                this.head = node
            }
        } else if (index === this.count) {
            current = this.tail
            current.next = node
            node.prev = current
            this.tail = node
        } else {
            const previous = this.getElementAt(index - 1)
            current = previous?.next as DoublyNode<T>
            node.next = current
            if(previous) previous.next = node
            current.prev = node
            node.prev = previous
        }
        this.count++
        return true
    }

    removeAt(index: number): T | undefined {
        
        if(index < 0 || index >= this.count) throw new Error('A posição é inválida')

        let current = this.head as DoublyNode<T>

        if(index === 0) {
            this.head = current?.next || undefined
            if(this.count === 1) {
                this.tail = undefined
            } else {
                if(this.head) this.head.prev = undefined
            }
        } else if (index === this.count - 1) {
            current = this.tail
            this.tail = current.prev
            this.tail.next = undefined
        } else {
            current = this.getElementAt(index) as DoublyNode<T>
            const previous = current.prev
            if(previous) previous.next = current.next
            if(current.next) current.next.prev = previous
        }

        this.count--
        return current.element
    }
}