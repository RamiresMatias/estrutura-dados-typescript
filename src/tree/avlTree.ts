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
}