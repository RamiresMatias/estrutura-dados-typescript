export class ValuePair {
    constructor(
        public key: string,
        public value: any
    ){}

    toString(): string {
        return `[#${this.key}: ${this.value}]`
    }
}

export class Dictionary {
    constructor(
        private table: { [key: string]: ValuePair } = {},
    ) {}

    hasKey(key: string): boolean {
        return this.table[key] !== null
    }

    set(key: string, value: any): boolean {
        if(key === null || value === null) return false
        
        this.table[key] = new ValuePair(key, value)
        return true
    }

    remove(key: string): boolean {
        if(!this.hasKey(key)) return false

        delete this.table[key]
        return true
    }

    get(key: string): any {
        const valuePair = this.table[key]
        return valuePair === null ? undefined : valuePair?.value
    }

    keyValues(): ValuePair[] {
        return Object.values(this.table)
    }

    keys(): string[] {
        return this.keyValues().map((valuePair) => valuePair.key)
    }

    values(): any {
        return this.keyValues().map((valuePair) => valuePair.value)
    }

    forEach(callbackFn: Function) {
        const valuesPair = this.keyValues()

        for(let i = 0; i < valuesPair.length; i++) {
            const result = callbackFn(valuesPair[i].key, valuesPair[i].value)
            if(result === false) break
        }
    }

    size(): number {
        return Object.keys(this.table).length
    }

    isEmpty(): boolean {
        return this.size() === 0
    }

    clear(): void {
        this.table = {}
    }

    toString(): string {
        if(this.isEmpty()) return ''

        const valuesPair = this.keyValues()
        let objString = `${valuesPair[0].toString()}`
        for(let i = 1; i < valuesPair.length; i++) {
            objString = `${objString}, ${valuesPair[i].toString()}`
        }

        return objString
    }
}