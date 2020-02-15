class SortTestHelper {
    constructor() {}
    // 生成有n个元素的随机数组，每个元素的随机范围为[rangeL, rangeR]
    generateRandomArray(n, rangeL, rangeR) {
        if (rangeL <= rangeR) {
            let arr = []
            for (let  i = 0; i < n; i++) {
                arr[i] = Math.floor(Math.random() * (rangeR - rangeL + 1) + rangeL);
            }
            return arr;
        } else {
            return []
        }
    }
    // 判断排序算法是否正确
    isSorted(arr, n) {
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }
    // 判断每种算法的时间
    testSort(sortName, sortFn, arr, n) {
        let startTime = Date.now();
        sortFn(arr, n);
        let endTime = Date.now();
        if (this.isSorted(arr, n)) {
            console.log(`${sortName}：${(endTime - startTime) / 1000}s`);
        } else {
            console.log('算法排序出错啦!');
        }
    }
}
module.exports = SortTestHelper;