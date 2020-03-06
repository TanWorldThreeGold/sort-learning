let SortTestHelper = require("./SortTestHelper");
let insertion = require("./InsertionSort");
// 双路快速排序法

function quickSort2(arr, num) {
    _quickSort2(arr, 0, num - 1);
}

// 对arr[l...r]部分进行快速排序
function _quickSort2(arr, l, r) {
    // if (l >= r) {
    //     return;
    // }
    if (r - l <= 15) {
        insertion.insertInMerge(arr, l, r);
        return;
    }
    let p = _partition2(arr, l, r);
    _quickSort2(arr, l, p - 1);
    _quickSort2(arr, p + 1, r);
}

// 对arr[l...r]部分进行partition操作
// 返回p，使得arr[l...p-1] < arr[p]; arr[p+1...r] > arr[p]
function _partition2(arr, l ,r) {
    // 用随机的锚进行比对，因为不用的话，如果数组是一个排好序的，那么他的时间复杂度会到O(n2);
    let rand = Math.floor(Math.random() * (r - l + 1) + l);
    [arr[l], arr[rand]] = [arr[rand], arr[l]];
    
    let v = arr[l];

    // arr[l+1...j] < v; arr[j+1...i] > v
    let i = l + 1, j = r;
    while(true) {
        while(i <= r && arr[i] < v) {
            i++;
        }
        while(j >= l + 1 && arr[j] > v) {
            j--;
        }
        if (i > j) {
            break;
        }
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
    }
    [arr[l], arr[j]] = [arr[j], arr[l]];
    return j;
}

function main() {
    let n = 100000;
    let testHelper = new SortTestHelper()
    let arr = testHelper.generateRandomArray(n, 0, n);
    // let arr = testHelper.generateNearlyOrderedArray(n, 0);
    testHelper.testSort("Quick Sort2", quickSort2, arr, n);
}
main();