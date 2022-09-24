export class Set {
    constructor(
        private items: any = {}
    ) {}

    has(element: any): boolean {
        return Object.prototype.hasOwnProperty.call(this.items, element)
    }

    add(element: any): boolean {
        if(this.has(element)) return false
        this.items[element] = element
        return true
    }

    delete(element: any): boolean {
        if(!this.has(element)) return false
        delete this.items[element]
        return true
    }

    size(): number {
        return Object.keys(this.items).length
    }

    values() {
        return Object.values(this.items)
    }

    union(otherSet: Set): Set {
        const unionSet = new Set()
        this.values().forEach(value => unionSet.add(value))
        otherSet.values().forEach(value => unionSet.add(value))
        return unionSet
    }

    intersection(otherSet: Set): Set {
        const intersectionSet = new Set()
        const values = this.values()
        const otherValues = otherSet.values()
        let biggerSet = values
        let smallerSet = otherValues
        if(otherValues.length - values.length > 0) {
            biggerSet = otherValues
            smallerSet = values
        }

        smallerSet.forEach(value => {
            if(biggerSet.includes(value)) intersectionSet.add(value)
        })

        return intersectionSet
    }

    difference(otherSet: Set): Set {
        const differenceSet = new Set() 
        this.values().forEach(value => {
            if(!otherSet.has(value)) {
                differenceSet.add(value)
            }
        })

        return differenceSet
    }

    isSubSetOf(otherSet: Set): boolean {
        if(this.size() > otherSet.size()) {
            return false
        }

        let isSubSet = true

        this.values().every(value => {
            if(!otherSet.has(value)) {
                isSubSet = false
                return false
            }
            return true
        })
        return isSubSet
    }
}

