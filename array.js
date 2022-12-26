// import rawData from './data.json' assert { type: "json" };
let numbers = [];
let container = document.getElementById("array");

function generatearray(length) {
    for (let i = 0; i < length; i++) {
        let value = Math.ceil(Math.random() * 100);
        let div = `
        <div class="block" data-transform="${i * 30}" style="height: ${value * 3}px; transform: translate(${i * 30}px);">
            <label class="element_value">${value}</label>
        </div>
        `
        numbers = [...numbers, value];
        $('#array').append(div)
    }
    window.localStorage.setItem("data", JSON.stringify(numbers))
}

function render(v, p) {
    let element = document.createElement("div");
    let value = v;
    let position = p;

    // Thêm css cho thẻ div
    element.classList.add("block");
    element.style.height = `${value * 3}px`;
    element.style.backgroundColor =  '#13CE66'; 
    element.style.transform = `translate(${position}px)`;
    element.dataset.transform = position;

    // Tạo nhãn kí hiệu giá trị tương ứng của thẻ div
    let numberLabel = document.createElement("label");
    numberLabel.classList.add("element_value");
    numberLabel.innerText = value;

    element.appendChild(numberLabel);
    container.appendChild(element);
}

function changePosition(element) {
    console.log(element);
    return new Promise((resolve) => {
        let position = Number(element.dataset.transform);
        window.requestAnimationFrame(function () {
            // Đợi 0.25s
            setTimeout(() => {
                element.style.transform = `translate(${position + 30}px)`;
                resolve();
            }, 250);
        });
    })
}

function addNumber(value,position=0) {
    numbers = [...numbers, value];
    window.localStorage.setItem("data",JSON.stringify(numbers));
    let div = `
        <div class="block" data-transform="${position}" style="height: ${value * 3}px; transform: translate(${position}px);">
            <label class="element_value">${value}</label>
        </div>
        `
    $('#array').append(div)
}

async function insertNumber(index, value) {
    let blocks = Array.from(document.querySelectorAll(".block"));
    let length = blocks.length;
    let position = Number(blocks[index].dataset.transform);
    // let headList = blocks.splice(0,index);
    // let tailList = blocks.splice(index,length);

    for(let i = length-1; i >= index-1; i--) {
        blocks[i].style.backgroundColor = "#FF4949";
        changePosition(blocks[i]);
        await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 300)
            );
        // Thay đổi màu về màu trước đó
        blocks[i].style.backgroundColor = "#6b5b95";
        if(i===index) {
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 300)
            );
            render(value, position);
            return;
        }
    }

}

function swap(element1, element2) {
    return new Promise((resolve) => {
        // Để đổi css của hai element
        let temp = element1.style.transform; // lưu vị trí của el1 vào temp
        element1.style.transform = element2.style.transform;
        element2.style.transform = temp;

        window.requestAnimationFrame(function () {
            // Đợi 0.25s
            setTimeout(() => {
                //chèn element2 lên trước element1
                container.insertBefore(element2, element1);
                resolve();
            }, 250);
        });
    });
}

async function BubbleSort(delay = 100) {
    let blocks = document.getElementsByClassName("block");

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
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }

            // Thay đổi màu về màu trước đó
            blocks[j].style.backgroundColor = "#6b5b95";
            blocks[j + 1].style.backgroundColor = "#6b5b95";
        }

        // đổi màu khối đại diện phần tử có giá trị lớn nhất
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
}

//********************************************************************************************************************************************** */

$('#add-btn').on('click', function (e) {
    e.preventDefault();
    let lastBlock = document.querySelector('.block:last-child');
    let value = Number($('#value').val());
    let posision = lastBlock ? Number(lastBlock.dataset.transform) + 30 : 0;

    addNumber(value, posision);
    $('#value').val(null)
});

$('#insert-btn').on('click', function (e) {
    e.preventDefault();
    let divList = [...document.getElementsByClassName('block')];
    let value = Number($('#value').val());
    let position = Number($('#index').val());
    console.log(divList.length);
    if (value >= divList.length) {
        alert(`Không thể thêm vào vị trí này!!!\n*** Phải < ${position} ***`)
    }
    insertNumber(position, value);
    $('#value').val(null);
    $('#index').val(null);
});

$('#auto-btn').on('click', function (e) {
    e.preventDefault();
    const length = Number($('#auto').val());
    generatearray(length);
    $('#auto').val(null);
});

$('#sort-btn').on('click', function (e) {
    e.preventDefault();
    BubbleSort();
})

$('#refresh-btn').on('click', function (e) {
    e.preventDefault();
    container.innerHTML = '';
    numbers = JSON.parse(window.localStorage.getItem("data"));
    window.localStorage.clear();
    window.localStorage.setItem("data", JSON.stringify(numbers));

    for (let i = 0; i < numbers.length; i++) {
        let value = numbers[i];
        let div = `
        <div class="block" data-transform="${i * 30}" style="height: ${value * 3}px; transform: translate(${i * 30}px);">
            <label class="element_value">${value}</label>
        </div>
        `
        $('#array').append(div)
    }
})





Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};