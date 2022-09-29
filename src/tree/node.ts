export class Node {

    public key: any
    public left: Node | null
    public right: Node | null

    constructor(key: any) {
        this.key = key
        this.left = null
        this.right = null
    }
}