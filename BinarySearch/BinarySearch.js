// 二分查找法，在有序数组arr中，查找target
// 如果找到target，返回相应的索引index
// 如果没有找到target，返回-1
function binarySearch(arr, num, target) {
    // 在arr[l...r]之中查找target
    let l = 0; r = num - 1;
    while(l <= r) {
        // let mid = Math.floor((l + r) / 2);
        let mid = l + Math.floor((r - l) / 2);
        if (arr[mid] == target) {
            return mid;
        }
        // 在arr[l...mid-1]之中查找target
        if (target < arr[mid]) {
            r = mid - 1;
        }
        if (target > arr[mid]) {
            l = mid + 1;
        }
    }
    return -1;
}