export function defaultEquals(a: any, b: any): boolean {
    return a === b
}

export enum Compare {
    LESS_THAN = -1,
    BIGGER_THAN = 1
}

export enum BalanceFactor {
    UNBALANCED_RIGHT = 1,
    SLIGHTLY_UNBALANCED_RIGHT = 2,
    BALANCED = 3,
    SLIGHTLY_UNBALANCED_LEFT = 4,
    UNBALANCED_LEFT = 5,
}