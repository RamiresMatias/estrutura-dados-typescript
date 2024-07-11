/**
 * Tabela hash com sondagem linear.
 * 
 * A sondagem linear é uma técnica de resolução de colisão nas tabelas hash.
 * É chamada de linear porque os valores serão armazenados diretamente na tabela,
 * e não em uma estrutura de dados separada.
 * 
 * Ao tentar inserir um novo elemento, caso aquela posição esteja ocupada ele irá procurar 
 * outra posição vazia para inserir o novo elemento
 */

import { ValuePair } from "../models/valuePair";

export class HashTableLinear<K, T> {
  constructor(
    private table: { [key: string]: ValuePair<K, T> } = {},
  ) {}

  loseloseHashCode(key: K): number {
    if (typeof key === 'number') return key

    let hash = 0
    const strKey = String(key)
    for(let i = 0; i < strKey.length; i++) {
        hash += strKey.charCodeAt(i)
    }
    return hash % 37
  }

  /**
   * Ótima função para gerar hashs, pois a função "loseloseHashCode"
   * gera muitas colisões e a nível de desempenho, não é boa
   * @param key 
   */
  djb2HashCode(key: K) {
    const tableKey = String(key)
    let hash = 5381
    for(let i = 0; i < tableKey.length; i++) {
      hash += (hash * 33) + tableKey.charCodeAt(i)
    }
    return hash % 1013
  }

  hashCode(key: K) {
    return this.loseloseHashCode(key);
  }

  put(key: K, value: T): boolean {
    if(key === null && value === null) return false

    const position = this.hashCode(key)

    if (!this.table[position]) {
      this.table[position] = new ValuePair<K, T>(key, value)
    } else {
      let index = position + 1
      while(!!this.table[index]) {
        index++
      }
      this.table[index] = new ValuePair(key, value)
    }
    return true
  }

  get(key: K) {
    const position = this.hashCode(key)

    if (!this.table[position]) return undefined

    if (this.table[position].key === key) return this.table[position].value

    let index = position + 1
    while(!!this.table[index] && this.table[index].key !== key) {
      index++
    }
    if (!!this.table[index] && this.table[index].key === key) {
      return this.table[position].value
    }

    return undefined
  }

  remove(key: K) {
    const position = this.hashCode(key)

    if (!this.table[position]) return false

    if (this.table[position].key === key) {
      delete this.table[position]
      this.verifyRemoveSideEffects(key, position)
      return true
    }
    let index = position + 1
    while(!!this.table[index] && this.table[index].key !== key) {
      index++
    }
    if (!!this.table[index] && this.table[index].key === key) {
      delete this.table[index]
      this.verifyRemoveSideEffects(key, position)
      return true
    }
    return false
  }

  verifyRemoveSideEffects(key: K, removedPosition: number) {
    const hash = this.hashCode(key)
    let index = removedPosition + 1
    while(!!this.table[index]) {
      const posHash = this.hashCode(this.table[index].key)

      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index]
        delete this.table[index]
        removedPosition = index
      }
      index++
    }
  }
}

const hashTableLinear = new HashTableLinear<string, string>()
hashTableLinear.put('Jonathan', 'jonathan@gmail.com')
hashTableLinear.put('Jamie', 'jamie@email.com')
hashTableLinear.put('Jack', 'jack@email.com')
hashTableLinear.put('Jasmine', 'jasmine@email.com')
hashTableLinear.put('Jake', 'jake@email.com')

console.log(hashTableLinear);
console.log(hashTableLinear.remove('Jonathan'));
console.log(hashTableLinear);