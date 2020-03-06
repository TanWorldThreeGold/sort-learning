let SortTestHelper = require("./SortTestHelper");
let selectionSort = require("./SelectionSort");
let insertion = require("./InsertionSort");

// 自底向上的归并排序
function mergeSortBU(arr, num) {
    for (let sz = 1; sz <= num; sz += sz) {
        for (let i = 0; i + sz < num; i += sz + sz) {
            // 对arr[i...i+sz-1] 和 arr[i+sz...i+2sz-1]进行归并
            _merge(arr, i, i + sz - 1, Math.min(i + sz + sz - 1, num - 1));
        }
    }
}

function mergeSort(arr, num) {
    _mergeSort(arr, 0, num - 1);
}

// 递归使用归并排序，对arr[l...r]的范围进行排序
function _mergeSort(arr, l, r) {
    // if (l >= r) {
    //     return;
    // }
    if (r - l <= 15) {
        insertion.insertInMerge(arr, l, r);
        return;
    }
    let mid = Math.floor((l + r) / 2);
    _mergeSort(arr, l, mid);
    _mergeSort(arr, mid + 1, r);
    if (arr[mid] > arr[mid + 1]) {
        _merge(arr, l, mid, r);
    }
}

// 将arr[l...mid]和arr[mid+1...r]两部分进行归并
function _merge(arr, l, mid, r) {
    let aux = [];
    for (let i = l; i <= r; i++) {
        aux[i - l] = arr[i];
    }
    let i = l, j = mid + 1;
    for (let k = l; k <= r; k++) {
        if (i > mid) {
            arr[k] = aux[j - l];
            j++;
        } else if (j > r) {
            arr[k] = aux[i - l];
            i++;
        } else if (aux[i - l] < aux[j - l]) {
            arr[k] = aux[i - l];
            i++;
        } else {
            arr[k] = aux[j - l];
            j++;
        }
    }
}
function main() {
    let n = 10000;
    let testHelper = new SortTestHelper()
    let arr = testHelper.generateRandomArray(n, 0, n);
    // let arr = testHelper.generateNearlyOrderedArray(n, 100);
    let arr2 = testHelper.copyArray(arr, n);
    let arr3 = testHelper.copyArray(arr, n);
    let arr4 = testHelper.copyArray(arr, n);
    testHelper.testSort("Merge Sort", mergeSort, arr3, n);
    testHelper.testSort("Merge Sort Bottom", mergeSortBU, arr4, n);
    testHelper.testSort("Insertion Sort", insertion.insertionSort, arr, n);
    testHelper.testSort("Selection Sort", selectionSort, arr2, n);
}
main();