let Student = require("./Student");
let SortTestHelper = require("./SortTestHelper");

function selectionSort (arr, num, type) {
    for (let i = 0; i < num; i++) {
        let fn = type === 'isStudent' ? arr[i].sortScore : undefined
        // 寻找[i, n)区间里的最小值
        let minIndex = i;
        for (let j = i + 1; j < num; j++) {
            if (fn ? fn.call(arr[minIndex], arr[j]) : arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
}

function main1() {
    let answer = '';
    let arr = [10,9,8,7,6,5,4,3,2,1];
    selectionSort(arr, 10);
    for (let i = 0; i < 10; i++) {
        answer += `${arr[i]} `
    }
    console.log(answer);

    answer = '';
    arr = [4.4,3.3,2.2,1.1];
    selectionSort(arr, 4);
    for (let i = 0; i < 4; i++) {
        answer += `${arr[i]} `
    }
    console.log(answer);

    answer = '';
    arr = ["D", "C", "B", "A"];
    selectionSort(arr, 4);
    for (let i = 0; i < 4; i++) {
        answer += `${arr[i]} `
    }
    console.log(answer);

    let students = []
    let detail = [["D", 90], ["C", 100], ["B", 95], ["A", 95]];
    for (let i = 0; i < 4; i++) {
        students[i] = new Student(detail[i][0], detail[i][1]);
    }
    selectionSort(students, 4, "isStudent");
    console.log(students);
}

function main() {
    // let n = 10000;
    let n = 100000;
    let testHelper = new SortTestHelper();
    let arr = testHelper.generateRandomArray(n, 0, n);
    testHelper.testSort("Selection Sort", selectionSort, arr, n);
    // selectionSort(arr, n);
    // let answer = '';
    // for (let i = 0; i < n; i++) {
    //     answer += `${arr[i]} `
    // }
    // console.log(answer);
}

main();