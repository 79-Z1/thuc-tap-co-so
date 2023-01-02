function addToHead(value, numbers) {
    let length = numbers.length;
    if (length > 0) {
        //Dich chuyen cac phan tu
        for (let i = length; i >= 1; i--) {
            numbers[i] = numbers[i - 1];
        }
    }
    numbers[0] = value;
    return true;
}

function addToTail(value, numbers) {
    let length = numbers.length;

    numbers[length] = value;
    return true;
}

function addToAny(index, value, numbers) {
    let length = numbers.length;
    for (let i = length; i > index; i--) {
        numbers[i] = numbers[i - 1];
    }

    // Chen value tai index
    numbers[index] = value;
    return true;
}

function editNumber(index, value, numbers) {
    let length = numbers.length;

    for (let i = 0; i < length; i++) {
        if (i === index) {
            numbers[i] = value;
            return true;
        }
    }
}

function deleteNumberByIndex(index, numbers) {
    let length = numbers.length;
    if (length <= 0) {
        return;
    }
    // Dịch phần tử về đầu mảng từ vị trí xóa
    for (let i = index; i <= length - 2; i++) {
        numbers[i] = numbers[i + 1];
    }
    numbers.length--;
}

function deleteNumberByValue(value, numbers) {
    let length = numbers.length;
    if (length <= 0) {
        return;
    }
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === value) {
            deleteNumberByIndex(i, numbers);
        }
    }
}

function maxNumber(numbers) {
    let length = numbers.length;
    let max = numbers[0];
    for (let i = 1; i < length; i++) {
        if (max < numbers[i]) {
            max = numbers[i];
        }
    }
    console.log(max);
}

function minNumber(numbers) {
    let length = numbers.length;
    let min = numbers[0];
    for (let i = 1; i < length; i++) {
        if (min > numbers[i]) {
            min = numbers[i];
        }
    }
    console.log(min);
}

function searchNumber(value, numbers) {
    let length = numbers.length;
    let indexList = [];

    for (let i = 0; i < length; i++) {
        if (numbers[i] === value) {
            indexList = [...indexList, i];
        }
    }
    console.log(indexList);
}

function bubbleSort(numbers) {
    let length = numbers.length;
    for (let i = 0; i < length; i++) {
        let isSorted = true;
        for (let j = 0; j < length - i - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
                isSorted = false;
                let temp = numbers[j];
                numbers[j] = numbers[j + 1]
                numbers[j + 1] = temp;
            }
        }
        if (isSorted) {
            break;
        }
    }
    console.log(numbers);
}


const numbers = [9, 4, 5, 5, 2, 3, 8, 7, 1, 6, 3];
// addToHead(10,numbers);
// addToTail(10,numbers);
// addToAny(5,10, numbers);
// editNumber(5,10, numbers);
// deleteNumberByIndex(0, numbers);
// deleteNumberByValue(5, numbers);
// searchNumber(5, numbers);
// minNumber(numbers);
// maxNumber(numbers);
bubbleSort(numbers);