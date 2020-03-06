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
}

function main() {
    let n = 10;
    let maxHeap = new MaxHeap();
    for (let i = 0; i < n; i++) {
        maxHeap.insert(Math.floor(Math.random() * n * 3));
    }
    console.log(maxHeap);
    console.log('data size:' + maxHeap.size());

    while( !maxHeap.isEmpty()) {
        console.log(maxHeap.extractMax());
    }
}
main();