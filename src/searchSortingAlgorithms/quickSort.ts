const quickSort = (arr: number[]) => {
  if (arr.length < 2) {
    return arr
  }

  const pivo = arr[0]
  const less = []
  const bigger = []

  for(let i = 1; i < arr.length; i++) {
    if (arr[i] < pivo) less.push(arr[i])
    else bigger.push(arr[i])
  }
  return [...quickSort(less), pivo, ...quickSort(bigger)]
}

const arrTest = [5, 3, 6, 2, 10]
console.log(quickSort(arrTest));

// 109