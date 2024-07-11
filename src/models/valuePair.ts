export class ValuePair<K, T> {
  constructor(
      public key: K,
      public value: T
  ){}

  toString(): string {
      return `[#${this.key}: ${this.value}]`
  }
}
