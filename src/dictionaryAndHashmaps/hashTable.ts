import LinkedList from "../linkedList/linkedList"
import { ValuePair } from "./dictionary"

// Tabela hash com encadeamento separado
export class HashTable<T> {
    constructor(
        private table: { [key: string]: LinkedList<ValuePair<T>> } = {},
    ) {}

    loseHashCode(key: string): number {
        let hash = 0
        for(let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        return hash % 37
    }

    hashCode(key: string): number {
        return this.loseHashCode(key)
    }

    put(key: string, value: any): boolean {
        if(key === null && value === null) return false

        const position = this.hashCode(key)

        if (!this.table[position]) {
            this.table[position] = new LinkedList()
        }
        this.table[position].push(new ValuePair(key, value))
        return true
    }

    get(key: string): any {
        const position = this.hashCode(key)
        const linkedList = this.table[position]

        if (linkedList !== null && !linkedList.isEmpty()) {
            let current = linkedList.getHead()
            while(!!current) {
                if (current?.element?.key === key) {
                    return current.element.value
                }
                current = current?.next
            }
        }        
        return undefined
    }

    remove(key: string): boolean {
        const position = this.hashCode(key)
        const linkedList = this.table[position]
        if (linkedList !== null && !linkedList.isEmpty()) {
            let current = linkedList.getHead()
            while(current !== null) {
                if (current?.element?.key === key) {
                    linkedList.remove(current.element)
                    if (linkedList.isEmpty()) {
                        delete this.table[position]
                    }
                    return true
                }
                current = current?.next || null
            }
        }
        return false
    }
    isEmpty () {
        return !Object.keys(this.table).length
    }

    toString () {
        if (this.isEmpty()) return ''

        const keys = Object.keys(this.table)
        let objString = `${keys[0]} => ${this.table[keys[0]].toString()}`
        for(let i = 1; i < keys.length; i++) {
            objString += `${objString}, ${keys[i]} => ${this.table[keys[i]].toString()}`
        }
        return objString
    }
}

const table = new HashTable<string>()
table.put('Jonathan', 'jonathan@gmail.com')
table.put('Jamie', 'jamie@email.com')
table.remove('Jonathan')
console.log(table.get('Jonathan'));
// Encadeamento separado