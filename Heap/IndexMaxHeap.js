let SortTestHelper = require("./SortTestHelper");

class IndexMaxHeap {
    constructor() {
        this.data = [];
        this.count = 0;
        this.indexes = [];
        this.reverse = [];
    }
    size() {
        return this.count;
        // return this.data.length;
    }
    isEmpty() {
        return this.count == 0;
    }
    insert(index, item) {
        index += 1;
        this.data[this.count + 1] = item;
        this.indexes[this.count + 1] = index;
        this.reverse[index] = this.count + 1;
        this.count++;
        this.shiftUp(this.count);
    }
    shiftUp(k) {
        let floor = Math.floor;
        while(k > 1 && this.data[this.indexes[floor(k/2)]] < this.data[this.indexes[k]]) {
            [this.indexes[floor(k/2)], this.indexes[k]] = 
            [this.indexes[k], this.indexes[floor(k/2)]];
            this.reverse[this.indexes[floor(k/2)]] = floor(k/2);
            this.reverse[this.indexes[k]] = k;
            k = floor(k / 2);
        }
    }
    extractMax() {
        let ret = this.data[this.indexes[1]];
        [this.indexes[this.count], this.indexes[1]] = [this.indexes[1], this.indexes[this.count]];
        this.reverse[this.indexes[1]] = 1;
        this.reverse[this.indexes[this.count]] = 0;
        this.count--;
        this.shiftDown(1);
        return ret;
    }
    extractMaxIndex() {
        let ret = this.indexes[1] - 1;
        [this.indexes[this.count], this.indexes[1]] = [this.indexes[1], this.indexes[this.count]];
        this.reverse[this.indexes[1]] = 1;
        this.reverse[this.indexes[this.count]] = 0;
        this.count--;
        this.shiftDown(1);
        return ret;
    }
    getItem(index) {
        if (this.contain(index)) {
            return this.data[index + 1];
        }
    }
    change(index, newItem) {
        if (this.contain(index)) {
            index += 1;
            this.data[index] = newItem;
            // 找到indexes[j] = i,j表示data[i]在堆中的位置
            // 之后shiftUp(j),再shiftDown(j)
            // for (let j = 1; j <= this.count; j++) {
            //     if (this.indexes[j] === index) {
            //         this.shiftUp(j);
            //         this.shiftDown(j);
            //         return;
            //     }
            // }
            // 优化 加上reverse以后
            let j = this.reverse[index];
            this.shiftUp(j);
            this.shiftDown(j);
        }
    }
    contain(index) {
        if (index + 1>= 1 && index + 1 < this.count) {
            return this.reverse[index + 1] != 0;
        }
    }
    shiftDown(k) {
        while( 2 * k <= this.count) {
            let j = 2 * k; // 在此轮循环中，data[k]和data[j]交换位置
            if (j + 1 <= this.count && this.data[this.indexes[j + 1]] > this.data[this.indexes[j]]) {
                j += 1;
            }
            if (this.data[this.indexes[k]] >= this.data[this.indexes[j]]) {
                break;
            }
            [this.indexes[k], this.indexes[j]] = [this.indexes[j], this.indexes[k]];
            this.reverse[this.indexes[k]] = k;
            this.reverse[this.indexes[j]] = j;
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
    let maxHeap = new IndexMaxHeap();
    for(let i = 0; i < num; i++) {
        maxHeap.insert(arr[i]);
    }
    for(let i = num - 1; i >= 0; i--) {
        arr[i] = maxHeap.extractMax();
    }
}

// Heapify 算法复杂度为O(n) insert的方式算法复杂度为O(nlogn)
function heapSort2(arr, num) {
    let maxHeap = new IndexMaxHeap();
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
    let n = 100000;
    let testHelper = new SortTestHelper()
    let arr = testHelper.generateRandomArray(n, 0, n);
    let arr2 = testHelper.copyArray(arr, n);
    let arr3 = testHelper.copyArray(arr, n);
    testHelper.testSort("Heap Sort1", heapSort1, arr, n);
    testHelper.testSort("Heap Sort2", heapSort2, arr2, n);
    testHelper.testSort("Heap Sort3", heapSort, arr3, n);
}
main();