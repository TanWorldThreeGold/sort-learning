let SortTestHelper = require("./SortTestHelper");

class MaxHeap {
    constructor() {
        this.data = [];
        this.count = 0;
    }
    size() {
        return this.count;
        // return this.data.length;
    }
    isEmpty() {
        return this.count == 0;
    }
    insert(item) {
        this.data[this.count + 1] = item;
        this.count++;
        this.shiftUp(this.count);
    }
    shiftUp(k) {
        let floor = Math.floor;
        while(k > 1 && this.data[floor(k/2)] < this.data[k]) {
            [this.data[floor(k/2)], this.data[k]] = [this.data[k], this.data[floor(k/2)]];
            k = floor(k / 2);
        }
    }
    extractMax() {
        let ret = this.data[1];
        [this.data[this.count], this.data[1]] = [this.data[1], this.data[this.count]];
        this.count--;
        this.shiftDown(1);
        return ret;
    }
    shiftDown(k) {
        while( 2 * k <= this.count) {
            let j = 2 * k; // 在此轮循环中，data[k]和data[j]交换位置
            if (j + 1 <= this.count && this.data[j + 1] > this.data[j]) {
                j += 1;
            }
            if (this.data[k] >= this.data[j]) {
                break;
            }
            [this.data[k], this.data[j]] = [this.data[j], this.data[k]];
            k = j;
        }
    }
    arrayToHeap(arr, num) {
        this.data = [[], ...arr];
        this.count = num;
        for (let i = Math.floor(num / 2); i >= 1; i--) {
            this.shiftDown(i);
        }
    }
}

function heapSort1(arr, num) {
    let maxHeap = new MaxHeap();
    for(let i = 0; i < num; i++) {
        maxHeap.insert(arr[i]);
    }
    for(let i = num - 1; i >= 0; i--) {
        arr[i] = maxHeap.extractMax();
    }
}

// Heapify 算法复杂度为O(n) insert的方式算法复杂度为O(nlogn)
function heapSort2(arr, num) {
    let maxHeap = new MaxHeap();
    maxHeap.arrayToHeap(arr, num);
    for(let i = num - 1; i >= 0; i--) {
        arr[i] = maxHeap.extractMax();
    }
}

function heapSort(arr, num) {
    // 从(最后一个元素的索引-1)/2开始
    // 最后一个元素的索引为 num - 1
    for (let i = Math.floor((num - 1 - 1) / 2); i >= 0; i--) {
        _shiftDown(arr, num, i);
    }
    for (let i = num - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        _shiftDown(arr, i, 0);
    }
}

function _shiftDown(arr, num, k) {
    while(2 * k + 1 < num) {
        let j = 2 * k + 1;
        if (j + 1 < num && arr[j + 1] > arr[j]) {
            j += 1;
        }
        if (arr[k] >= arr[j]) {
            break;
        }
        [arr[k], arr[j]] = [arr[j], arr[k]];
        k = j;
    }
}

function main() {
    // let n = 10;
    // let maxHeap = new MaxHeap();
    // for (let i = 0; i < n; i++) {
    //     maxHeap.insert(Math.floor(Math.random() * n * 3));
    // }
    // console.log(maxHeap);
    // console.log('data size:' + maxHeap.size());

    // while( !maxHeap.isEmpty()) {
    //     console.log(maxHeap.extractMax());
    // }
    let n = 100001;
    let testHelper = new SortTestHelper()
    let arr = testHelper.generateRandomArray(n, 0, n);
    let arr2 = testHelper.copyArray(arr, n);
    let arr3 = testHelper.copyArray(arr, n);
    testHelper.testSort("Heap Sort1", heapSort1, arr, n);
    testHelper.testSort("Heap Sort2", heapSort2, arr2, n);
    testHelper.testSort("Heap Sort3", heapSort, arr3, n);
}
main();