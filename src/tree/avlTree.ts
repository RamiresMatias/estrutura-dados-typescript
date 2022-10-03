import { BalanceFactor } from "../util/util";
import { BinarySearchTree } from "./binarySearchTree";
import { Node } from "./node";

export class AVLTree<T> extends BinarySearchTree<T> {
    constructor() {
        super(null)
    }

    getNodeHeight(node: Node | null): number {
        if(node === null) return -1

        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right) + 1)
    }

    getBalanceFactor(node: Node): number {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right) 
        switch(heightDifference) {
            case -2: return BalanceFactor.UNBALANCED_RIGHT
            case -1: return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            case  1: return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            case  2: return BalanceFactor.UNBALANCED_LEFT
            default: return BalanceFactor.BALANCED
        }
    }

    rotationLL(node: Node): Node {
        const temp = node.left as Node
        node.left = temp.right
        temp.right = node 
        return temp
    }

    rotationRR(node: Node): Node {
        const temp = node.right as Node
        node.right = temp.left
        temp.left = node
        return temp
    }

    rotationLR(node: Node): Node {
        node.left = this.rotationRR(node.left as Node)
        return this.rotationLL(node)
    }

    rotationRL(node: Node): Node {
        node.right = this.rotationLL(node.right as Node)
        return this.rotationRR(node)
    }
    
    insert(key: T): void {
        this.root = this.insertNode(this.root as Node, key)
    }

    insertNode(node: Node | null, key: T): Node {

        if(node === null) {
            return new Node(key)
        } else if (key < node.key) {
            node.left = this.insertNode(node.left, key)
        } else if (key > node.key) {
            node.right = this.insertNode(node.right, key)
        } else {
            return node
        }

        const balanceFactor = this.getBalanceFactor(node)
        if(balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if(key < node.left?.key) {
                node = this.rotationLL(node)
            } else {
                return this.rotationLR(node)
            }
        }

        if(balanceFactor === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
            if(key > node.right?.key) {
                node = this.rotationRR(node)
            } else {
                return this.rotationRL(node)
            }
        }

        return node
    }

    removeNode(node: Node | null, key: T): Node | null {
        node = super.removeNode(node, key)
        if(node == null) {
            return node
        }

        const balanceFactor = this.getBalanceFactor(node)

        if(balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            const balanceFactorLeft = this.getBalanceFactor(node.left as Node)
            if(
                balanceFactorLeft === BalanceFactor.BALANCED ||
                balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) {
                return this.rotationLL(node)
            }

            if(balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node.left as Node)
            }
        }

        if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const balanceFactorRight = this.getBalanceFactor(node.right as Node)
            if(
                balanceFactorRight === BalanceFactor.BALANCED ||
                balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) {
                return this.rotationRR(node)
            }

            if(balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node.right as Node)
            }
        }

        return node
    }
}