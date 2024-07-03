import { arrNames } from "../util/util";

function binarySearch<T>(list: T[], item: T): {mid: number, steps: number} {
  let steps = 0
  let start = 0
  let end = list.length - 1

  while(start <= end) {
    steps += 1
    const mid = Math.ceil((start + end) / 2)
    const hit = list[mid]

    if (hit === item) return {mid, steps}
    if (hit > item) end = mid - 1
    else start = mid + 1 
  }
  return null
}

// const list: number[] = [1,3,5,7,9]
// console.log(binarySearch<typeof list[0]>(list, 1));

// arrNames.length = 128
// console.log(binarySearch(arrNames, arrNames[100]))
// Número máximo de tentativas: 7

arrNames.length = 128 * 2
console.log(binarySearch(arrNames, arrNames[88]))
// Número máximo de tentativas: 9