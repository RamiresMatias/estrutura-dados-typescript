import { Colors } from "../util/util";
import { BinarySearchTree } from "./binarySearchTree";
import {Node} from './node'

export class RedBlackNode extends Node {
    
    public key: any
    public color: Colors
    public parent: RedBlackNode | null
    public left: RedBlackNode | null
    public right: RedBlackNode | null

    constructor(key: any) {
        super(key)
        this.key = key
        this.color = Colors.RED
        this.parent = null
        this.left = null
        this.right = null
    }

    isRed(): boolean {
        return this.color === Colors.RED
    }
}

export class RedBlackTree<T> extends BinarySearchTree<T> {

    public root: RedBlackNode | null

    constructor() {
        super(null)
        this.root = null
    }

    insert(key: T): void {
        if(this.root == null) {
            this.root = new RedBlackNode(key)
            this.root.color = Colors.BLACK
        } else {
            const newNode = this.insertNode(this.root, key)
            this.fixTreeProperties(newNode)
        }
    }

    insertNode(node: RedBlackNode, key: T): RedBlackNode {
        if(key < node.key) {
            if(node.left == null) {
                node.left = new RedBlackNode(key)
                node.left.parent = node as RedBlackNode
                return node.left
            } else {
                return this.insertNode(node.left, key)
            }
        } else if (node.right == null) {
            node.right = new RedBlackNode(key)
            node.right.parent = node
            return node.right
        } else {
            return this.insertNode(node.right, key)
        }
    }

    fixTreeProperties(node: RedBlackNode) {
        while(node && node.parent && node.parent.isRed() && node.color !== Colors.BLACK) {
            let parent = node.parent
            const grandParent = parent.parent
            
            //O Pai é o filho a esquerda
            if(grandParent && grandParent.left === parent) {
                const uncle = grandParent.right

                if(uncle && uncle.isRed()) {
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent
                } else {
                    if(node === parent.right) {
                        this.rotationRR(parent)
                        node = parent
                        parent = node.parent as RedBlackNode
                    }
                    this.rotationLLRedBlack(grandParent)
                    parent.color = Colors.BLACK
                    grandParent.color = Colors.RED
                    node = parent
                }
            } else { // O pai é o filho a direita
                const uncle = grandParent?.left

                if(uncle && uncle.isRed()) {
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent
                } else {
                    if(node === parent.left) {
                        this.rotationLLRedBlack(parent)
                        node = parent
                        parent = node.parent as RedBlackNode
                    }
                    this.rotationRR(grandParent as RedBlackNode)
                    parent.color = Colors.BLACK
                    if(grandParent) grandParent.color = Colors.RED
                    node = parent
                }
            }

            if(this.root) this.root.color = Colors.BLACK 
        }
    }

    rotationLLRedBlack(node: RedBlackNode): void {
        const temp = node.left
        node.left = temp?.right as RedBlackNode

        if(temp?.right && temp.right.key) {
            temp.right.parent = node
        }

        if(temp) temp.parent = node.parent

        if(!node.parent) {
            this.root = temp
        } else {
            if(node === node.parent.left) {
                node.parent.left = temp
            } else {
                node.parent.right = temp
            }
        }

        if(temp) temp.right = node as RedBlackNode
        node.parent = temp
    }

    rotationRRRedBlack(node: RedBlackNode): void {
        const temp = node.right
        node.right = temp?.left as RedBlackNode

        if(temp?.left && temp.left.key) {
            temp.left.parent = node
        }

        if(temp) temp.parent = node.parent

        if(!node.parent) {
            this.root = temp
        } else {
            if(node === node.parent.left) {
                node.parent.left = temp
            } else {
                node.parent.right = temp
            }
        }

        if(temp) temp.left = node as RedBlackNode
        node.parent = temp
    }
}