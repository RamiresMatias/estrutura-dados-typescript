import LinkedList from "./linkedList"
import { defaultEquals } from "../util/util";
import { Compare } from "../types/types";

function defaultCompare(a: any, b: any) {
    if(a === b) return 0

    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

class SortedLinkedList<T> extends LinkedList<T> {
    constructor(
        equalsFn: Function = defaultEquals, 
        protected compareFn: Function = defaultCompare
    ) {
        super(equalsFn)    
    }

    insert(element: T, index: number): boolean {
        if(this.isEmpty()) return super.insert(element, 0)
        const pos = this.getIndexSortedElement(element)
        return super.insert(element, pos)
    }

    getIndexSortedElement(element: T): number {
        let current = this.head
        let i = 0
        for(; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element)
            if(comp === Compare.LESS_THAN) return i
            current = current.next
        }
        return i
    }
}