let SortTestHelper = require("./SortTestHelper");
let insertion = require("./InsertionSort");

function quickSort(arr, num) {
    _quickSort(arr, 0, num - 1);
}

// 对arr[l...r]部分进行快速排序
function _quickSort(arr, l, r) {
    // if (l >= r) {
    //     return;
    // }
    if (r - l <= 15) {
        insertion.insertInMerge(arr, l, r);
        return;
    }
    let p = _partition(arr, l, r);
    _quickSort(arr, l, p - 1);
    _quickSort(arr, p + 1, r);
}

// 对arr[l...r]部分进行partition操作
// 返回p，使得arr[l...p-1] < arr[p]; arr[p+1...r] > arr[p]
function _partition(arr, l ,r) {
    // 用随机的锚进行比对，因为不用的话，如果数组是一个排好序的，那么他的时间复杂度会到O(n2);
    let rand = Math.floor(Math.random() * (r - l + 1) + l);
    [arr[l], arr[rand]] = [arr[rand], arr[l]];

    let v = arr[l];

    // arr[l+1...j] < v; arr[j+1...i] > v
    let j = l;
    for (let i = l + 1; i <= r; i++) {
        if (arr[i] < v) {
            [arr[j+1], arr[i]] = [arr[i], arr[j+1]];
            j++;
        }
    }
    [arr[l], arr[j]] = [arr[j], arr[l]];
    return j;
}

function main() {
    let n = 50000;
    let testHelper = new SortTestHelper()
    let arr = testHelper.generateRandomArray(n, 0, n);
    // let arr = testHelper.generateNearlyOrderedArray(n, 0);
    testHelper.testSort("Quick Sort", quickSort, arr, n);
}
main();