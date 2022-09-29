import { ValuePair } from "./dictionary"

export class HashTable {
    constructor(
        private table: { [key: string]: ValuePair } = {},
    ) {}

    loseloseHashCode(key: string): number {
        let hash = 0
        for(let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        return hash % 37
    }

    hashCode(key: string): number {
        return this.loseloseHashCode(key)
    }

    put(key: string, value: any): boolean {
        if(key !== null && value !== null) return false

        const position = this.hashCode(key)
        this.table[position] = new ValuePair(key, value)
        return true
    }

    get(key: string): any {
        const valuePair = this.table[this.hashCode(key)]
        return valuePair === null ? undefined : valuePair.value
    }

    remove(key: string): boolean {
        const hash = this.hashCode(key)
        const valuePair = this.table[hash]

        if(!valuePair) return false

        delete this.table[hash]
        return true
    }
}
