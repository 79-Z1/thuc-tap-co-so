// import rawData from './data.json' assert { type: "json" };
let numbers = [];
let container = document.getElementById("array");
let blocks = [];

function generatearray(length) {
    localStorage.clear();
    numbers = [];
    for (let i = 0; i < length; i++) {
        let value = Math.ceil(Math.random() * 100);
        let div = `
        <div class="block" data-transform="${i * 40}" style="height: ${value * 4}px; transform: translate(${i * 40}px);">
            <label class="element_value">${value}</label>
        </div>
        `
        numbers = [...numbers, value];
        $('#array').append(div)
    }

    window.localStorage.setItem("data", JSON.stringify(numbers));
}

async function addNumber(value, position = 0) {
    let length = numbers.length;
    numbers[length] = value;

    window.localStorage.setItem("data", JSON.stringify(numbers));
    let div = `
        <div 
            class="block" 
            data-transform="${position}" 
            style="height: ${value * 4}px; 
            transform: translate(${position}px);
            background-color: #13CE66;"
        >
            <label class="element_value">${value}</label>
        </div>`;
    $('#array').append(div);
    await delay(300);
    $(".block:last-child").css({ "background-color": "#6b5b95" });

}

async function insertNumber(index, value) {
    blocks = Array.from(document.querySelectorAll(".block"));
    let length = numbers.length;
    let position = Number(blocks[index].dataset.transform);

    for (let i = length; i > index; i--) {
        blocks[i - 1].style.backgroundColor = "#FF4949";
        upPosition(blocks[i - 1]);
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 300)
        );
        numbers[i] = numbers[i - 1];
        blocks[i - 1].style.backgroundColor = "#6b5b95";
    }
    addNumber(value, index, position);
    $('.notice').text(`Đã chèn thành công số ${value} vào vị trí số ${index}`);
    $('.notice').addClass('animation');

    // Chen value tai index
    numbers[index] = value;
    blocks = Array.from(document.querySelectorAll(".block"));
    window.localStorage.setItem("data", JSON.stringify(numbers));
}

async function editNumber(index, value) {
    blocks = Array.from(document.querySelectorAll(".block"));
    let length = numbers.length;

    for (let i = 0; i < length; i++) {
        blocks[i].style.backgroundColor = "#FF4949";
        if (i === index) {
            blocks[i].style.backgroundColor = "#13CE66";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 300)
            );
            numbers[i] = value;
            blocks[i].firstElementChild.textContent = value;
            return;
        }
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 300)
        );
        blocks[i].style.backgroundColor = "#6b5b95";
    }

    window.localStorage.setItem("data", JSON.stringify(numbers));
}

function deleteNumberByIndex(index) {
    return new Promise(async (resolve) => {
        blocks = document.querySelectorAll(".block");

        if (numbers.length <= 0) {
            $('.notice').text(`Mảng của bạn đang rỗng!!!`);
            $('.notice').addClass('animation');
            return;
        }

        await remove(blocks[index]);
        /* Dịch phần tử về đầu mảng từ vị trí xóa */
        for (let i = index; i < numbers.length - 1; i++) {
            numbers[i] = numbers[i + 1];
            blocks[i + 1].style.backgroundColor = "#FF4949";
            await backPosition(blocks[i + 1]);
            setTimeout(() => {
                resolve();
            }, 300)
            blocks[i + 1].style.backgroundColor = "#6b5b95";
        }
        numbers.length--;
        window.localStorage.setItem("data", JSON.stringify(numbers));
    });

}

async function deleteNumberByValue(value) {
    blocks = document.querySelectorAll(".block");
    if (numbers.length <= 0) {
        alert('Mảng đang rỗng!!!')
    }

    for (let i = 0; i < numbers.length; i++) {
        blocks[i].style.backgroundColor = "#FF4949";
        await delay(300);
        if (numbers[i] === value) {
            $('.notice').text(`Đã tìm thấy phần tử có giá trị ${value}`);
            $('.notice').addClass('animation');
            await deleteNumberByIndex(i);
            return;
        }
        blocks[i].style.backgroundColor = "#6b5b95";
    }
    window.localStorage.setItem("data", JSON.stringify(numbers));
}

function swap(element1, element2) {
    return new Promise((resolve) => {
        // Để đổi css của hai element
        let temp = element1.style.transform; // lưu vị trí của el1 vào temp
        element1.style.transform = element2.style.transform;
        element2.style.transform = temp;

        window.requestAnimationFrame(function () {
            setTimeout(() => {
                //chèn element2 lên trước element1
                container.insertBefore(element2, element1);
                resolve();
            }, 300);
        });
    });
}

async function BubbleSort(delay = 100) {
    blocks = document.getElementsByClassName("block");

    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {

            // Đổi màu các phần tử được so sánh
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            let value1 = Number(blocks[j].firstElementChild.textContent);
            let value2 = Number(blocks[j + 1].firstElementChild.textContent);

            // So sánh giá trị j và j+1
            if (value1 > value2) {
                let temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }

            // Thay đổi màu về màu trước đó
            blocks[j].style.backgroundColor = "#6b5b95";
            blocks[j + 1].style.backgroundColor = "#6b5b95";
        }

        // đổi màu phần tử có giá trị lớn nhất
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
        window.localStorage.setItem("data", JSON.stringify(numbers));
    }
    $('.notice').text(`Đã sắp xếp xong !!!`);
    $('.notice').addClass('animation');
}

async function remove(element) {
    element.style.backgroundColor = '#13CE66';
    await delay(1000);
    element.remove();
    $('.notice').text(`Đã xóa thành công phần tử có giá trị ${element.firstElementChild.textContent}`);
    $('.notice').addClass('animation');
}

function upPosition(element) {
    return new Promise((resolve) => {
        let position = Number(element.dataset.transform);
        window.requestAnimationFrame(function () {
            setTimeout(() => {
                element.style.transform = `translate(${position + 40}px)`;
                resolve();
            }, 300);
        });
    })
}

function backPosition(element) {
    return new Promise((resolve) => {
        let position = Number(element.dataset.transform);
        window.requestAnimationFrame(function () {
            // Đợi 0.25s
            setTimeout(() => {
                element.style.transform = `translate(${position - 40}px)`;
                resolve();
            }, 300);
        });
    })
}

function delay(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}

function whichtInputIsEmpty() {
    if ($("#value").val() == "" || $("#value").val() == null)
        return 'value empty';
    else if ($("#index").val() == "" || $("#index").val() == null)
        return 'index empty';
    else return 'no empty';
}
//********************************************************************************************************************************************** */

$('#add-btn').on('click', function (e) {
    e.preventDefault();
    let lastBlock = document.querySelector('.block:last-child');
    let value = Number($('#value').val());
    let posision = lastBlock ? Number(lastBlock.dataset.transform) + 40 : 0;

    addNumber(value, posision);
    $('.notice').text(`Đã thêm thành công số ${value} vào mảng`);
    $('.notice').addClass('animation');

    $('#value').val(null)
});

$('#insert-btn').on('click', function (e) {
    e.preventDefault();
    let value = Number($('#value').val());
    let index = Number($('#index').val());

    if (index >= numbers.length) {
        alert(`Không thể thêm vào vị trí này!!!\n*** Phải < ${numbers.length} ***`)
    }
    insertNumber(index, value);

    $('#value').val(null);
    $('#index').val(null);
});

$('#edit-btn').on('click', function (e) {
    e.preventDefault();
    let value = Number($('#value').val());
    let index = Number($('#index').val());

    if (index > numbers.length - 1 || index < 0) {
        alert(`Không thể sửa ở vị trí này!!!\n*** 0 < Vị trí < ${numbers.length} ***`)
    }

    editNumber(index, value);
    $('#value').val(null);
    $('#index').val(null);
})

$('#delete-btn').on('click', async function (e) {
    e.preventDefault();
    let index = Number($('#index').val());
    let value = Number($('#value').val());

    if (index > numbers.length - 1 || index < 0) {
        alert(`Không thể xóa ở vị trí này!!!\n*** 0 < Vị trí < ${numbers.length} ***`)
    }
    let check = whichtInputIsEmpty();
    if (check === 'value empty') {
        await deleteNumberByIndex(index)
    } else if (check === 'index empty') {
        deleteNumberByValue(value);
    } else {
        deleteNumberByIndex(index);
    }

    $('#value').val(null);
    $('#index').val(null);
})

$('#auto-btn').on('click', function (e) {
    e.preventDefault();
    const length = Number($('#auto').val());

    container.innerHTML = '';
    generatearray(length);
    $('#auto').val(null);
});

$('#sort-btn').on('click', async function (e) {
    e.preventDefault();
    BubbleSort();
})

$('#refresh-btn').on('click', function (e) {
    e.preventDefault();
    $('.notice').removeClass('animation');
    container.innerHTML = '';
    numbers = JSON.parse(window.localStorage.getItem("data"));
    window.localStorage.clear();
    window.localStorage.setItem("data", JSON.stringify(numbers));

    for (let i = 0; i < numbers.length; i++) {
        let value = numbers[i];
        let div = `
        <div class="block" data-transform="${i * 40}" style="height: ${value * 4}px; transform: translate(${i * 40}px);">
            <label class="element_value">${value}</label>
        </div>
        `
        $('#array').append(div);
    }
})

