import { getIndexLess } from "../util/util"

const selectionSort = (arr: number[]) => {
  const newArr = []
  const n = arr.length

  for(let i = 0; i < n; i++) {
    const less_index = getIndexLess(arr)
    newArr.push(arr[less_index])
    arr = arr.toSpliced(less_index, 1)
  }

  return newArr
}

const arrTest = [5, 3, 6, 2, 10]
console.log(selectionSort(arrTest))