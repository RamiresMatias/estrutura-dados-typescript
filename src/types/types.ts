export type ItemsType<T> = {[k: number]: T}

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

export enum Colors {
  BLACK = 'BLACK',
  RED = 'RED'
}

export enum ColorsGraph {
  WHITE = 0,
  GREY = 1,
  BLACK = 2
}