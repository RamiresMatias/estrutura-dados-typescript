import { Node } from "./node";

export class DoublyNode<T> extends Node<T> {
    constructor(
        public element: T,
        public next?: DoublyNode<T> | undefined,
        public prev?: DoublyNode<T> | undefined,
    ) {
        super(element, next)
    }
}