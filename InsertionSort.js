let SortTestHelper = require("./SortTestHelper");
let selectionSort = require("./SelectionSort");

// 插入和选择排序都是O(n^2),但插入在近似有序数组中速度很快，甚至超过了O(nlogn)的一些算法
function insertionSort (arr, num) {
    for (let i = 1; i < num; i++) {
        // 寻找元素arr[i]合适的插入位置
        let value = arr[i];
        let j;
        for (j = i; j > 0 && arr[j - 1] > value; j--) {
            arr[j] = arr[j - 1];
        }
        arr[j] = value;
    }
}

function main() {
    let n = 10000;
    // 近似有序数组比普通数组排序，插入排序明显快很多
    let testHelper = new SortTestHelper()
    // let arr = testHelper.generateRandomArray(n, 0, n);
    let arr = testHelper.generateNearlyOrderedArray(n, 100);
    let arr2 = testHelper.copyArray(arr, n);

    testHelper.testSort("Insertion Sort", insertionSort, arr, n);
    testHelper.testSort("Selection Sort", selectionSort, arr2, n);
}
main();