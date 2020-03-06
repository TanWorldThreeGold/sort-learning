let SortTestHelper = require("./SortTestHelper");
let insertion = require("./InsertionSort");
// 三路快速排序法

function quickSort3(arr, num) {
    _quickSort3(arr, 0, num - 1);
}

// 对arr[l...r]部分进行快速排序
function _quickSort3(arr, l, r) {
    // if (l >= r) {
    //     return;
    // }
    if (r - l <= 15) {
        insertion.insertInMerge(arr, l, r);
        return;
    }
    
    // 用随机的锚进行比对，因为不用的话，如果数组是一个排好序的，那么他的时间复杂度会到O(n2);
    let rand = Math.floor(Math.random() * (r - l + 1) + l);
    [arr[l], arr[rand]] = [arr[rand], arr[l]];

    let v = arr[l];

    let lt = l; // arr[l+1...lt] < v
    let gt = r + 1; // arr[gt...r] > v
    let i = l + 1; // arr[lt+1...i] == v
    while(i < gt) {
        if (arr[i] < v) {
            [arr[i], arr[lt + 1]] = [arr[lt + 1], arr[i]];
            lt++;
            i++;
        } else if (arr[i] > v) {
            [arr[i], arr[gt - 1]] = [arr[gt - 1], arr[i]];
            gt--;
        } else { // arr[i] == v
            i++;
        }
    }
    [arr[l], arr[lt]] = [arr[lt], arr[l]];
    _quickSort3(arr, l, lt - 1);
    _quickSort3(arr, gt, r);

}

function main() {
    let n = 100000;
    let testHelper = new SortTestHelper()
    let arr = testHelper.generateRandomArray(n, 0, n);
    // let arr = testHelper.generateNearlyOrderedArray(n, 0);
    testHelper.testSort("Quick Sort3", quickSort3, arr, n);
}
main();