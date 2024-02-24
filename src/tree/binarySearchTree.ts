import { Node } from "./node";

export class BinarySearchTree<T> {
    constructor(
        protected root: Node | null
    ) {}

    insert(key: T): void {
        if(this.root === null) this.root = new Node(key)
        else this.insertNode(this.root, key)
    }

    insertNode(node: Node, key: T): void {
        if(key < node.key) {
            if(node.left === null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if(node.right === null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    inOrderTraverse(callback: Function): void {
        this.inOrderTraverseNode(this.root, callback)
    }

    inOrderTraverseNode(node: Node | null, callback: Function): void {
        if(node !== null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)
        }
    }

    preOrderTraverse(callback: Function): void {
        this.preOrderTraverseNode(this.root, callback)
    }

    preOrderTraverseNode(node: Node | null, callback: Function): void {
        if(node !== null) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)
        }
    }

    postOrderTraverse(callback: Function): void {
        this.postOrderTraverseNode(this.root, callback)
    }

    postOrderTraverseNode(node: Node | null, callback: Function): void {
        if(node !== null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }

    min():  Node | null {
        return this.minNode(this.root)
    }

    minNode(node: Node | null):  Node | null {
        let current = node
        while(current !== null && current.left !== null) {
            current = current.left
        }
        return current
    }

    max():  Node | null {
        return this.maxNode(this.root)
    }

    maxNode(node: Node | null): Node | null {
        let current = node
        while(current !== null && current.right !== null) {
            current = current.right
        }
        return current
    }

    search(key: T): boolean {
        return this.searchNode(this.root, key)
    }

    searchNode(node: Node | null, key: T): boolean {
        if(node === null) return false

        if(key < node.key) return this.searchNode(node.left, key)
        else if (key > node.key) return this.searchNode(node.right, key)
        else return true
    }

    remove(key: T) {
        return this.removeNode(this.root, key)
    }

    removeNode(node: Node | null, key: T) {
        if(node == null) return null

        if(key < node.key) {
            node.left = this.removeNode(node.left, key) as Node | null
            return node 
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key) as Node | null
            return node
        } else {
            if(node.left == null && node.right == null) {
                node = null
                return node
            }

            if(node.left == null) {
                node = node.right
                return node
            } else if(node.right == null) {
                node = node.left
                return node
            }

            const aux = this.minNode(node.right)!
            node.key = aux.key
            node.right = this.removeNode(node.right, aux.key) as Node | null
            return node
           
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

const printNode = (value: any) => console.log(value);

const bts = new BinarySearchTree<number>(null)
bts.insert(11)
bts.insert(7)
bts.insert(5)
bts.insert(9)
bts.insert(3)
bts.insert(6)
bts.insert(8)
bts.insert(10)
bts.insert(15)
bts.insert(13)
bts.insert(20)
bts.insert(12)
bts.insert(14)
bts.insert(18)
bts.insert(25)

