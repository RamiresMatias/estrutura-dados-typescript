import { ItemsType } from "../types/types"

export class Deque<T>{
    constructor(
        private count: number = 0,
        private lowestCount: number = 0,
        private items: ItemsType<T> = {},
    ) {}

    addFront(element: T): void {
        if(this.isEmpty()) {
            this.addBack(element)
        } else if (this.lowestCount > 0) {
            this.lowestCount--
            this.items[this.lowestCount] = element
        } else {
            for(let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1]
            }
            this.count++
            this.lowestCount = 0
            this.items[0] = element
        }
    }

    addBack(element: T): void {
        this.items[this.count] = element
        this.count++
    }

    removeFront(): T | undefined {
        if(this.isEmpty()) return undefined
        
        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result
    }

    removeBack(): T | undefined {
        if(this.isEmpty()) return undefined
        
        this.count--
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }

    getItems(): ItemsType<T> {
        return this.items
    }

    isEmpty(): boolean {
        return this.size() === 0
    }

    size(): number {
        return this.count - this.lowestCount
    }

    clear(): void {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }

    toString(): string {
        if(this.isEmpty()) return ''

        let objString = `${this.items[this.lowestCount]}`
        for(let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`
        }

        return objString
    }
}
