class Shoes {
    constructor(name, size, color, price) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.price = price
    }

    setName(value) {
        this.name = value
    }

    getName() {
        return this.name;
    }

    setSize(value) {
        this.size = value
    }

    getSize() {
        return this.size;
    }

    setColor(value) {
        this.color = value
    }

    getColor() {
        return this.color;
    }

    setPrice(value) {
        this.price = value
    }

    getPrice() {
        return this.price;
    }
}


var tabShoes = [];

var checking = true;

document.querySelector('.container').addEventListener('click', function() {
    this.classList.add('click');
})


function getShoes(name) {
    for (var i = 0; i <= tabShoes.length; i++) {
        let shoes = tabShoes[i];

        for (var property in shoes) {
            if (name === shoes.getName()) {
                return shoes;
            }
        }
    }
}

function getSize(sizeSpan, sizeNumber) {
    var allSizeSpan = document.querySelectorAll('.productSizes>span');

    var currentSpan = sizeSpan;
    allSizeSpan.forEach(function (element) {
        if (element.textContent !== currentSpan) {
            element.classList.remove('active');
        }
    })
    currentSpan.classList.add('active');

    return sizeSpan, sizeNumber;

}

function getColor(colorSpan, Color) {
    var allColorSpan = document.querySelectorAll('.productColor>span');

    var currentSpan = colorSpan;

    allColorSpan.forEach(function (element) {
        if (element.getAttribute('data-color') !== Color) {
            element.classList.remove('active');
        }
    })
    currentSpan.classList.add('active');

    ChangeColor(Color);

    return colorSpan, Color;
}

function ChangeColor(Color) {
    var currentColor = window.getComputedStyle(document.querySelector('.productColor>span.active'), null).getPropertyValue("background-color");
    document.querySelector('.circle').style.background = currentColor;
    // Change SRC image
    document.querySelector('.img>img').setAttribute('src', './vans_PNG29-' + Color + '.png');
}

function addShoes() {
    var currentName = document.querySelector('.productName').textContent;
    var currentColor = document.querySelector('.active').getAttribute('data-color');

    var currentSize = getSize(document.querySelector('.productSizes>span.active'), document.querySelector('.productSizes>span.active').textContent);

    var currentColor = getColor(document.querySelector('.productColor>span.active'), document.querySelector('.productColor>span.active').getAttribute('data-color'));

    var price = document.querySelector('.circle>p').textContent;
    var shoes;

    if (tabShoes) {
        shoes = new Shoes(
            currentName,
            currentSize,
            currentColor,
            price
        );

        if (getShoes(currentName)) {
            shoes = getShoes(currentName);

            shoes.setSize(currentSize);
            shoes.setColor(currentColor);
            shoes.setPrice(price);
        }
    }
    tabShoes.push(shoes);

    writeInfos(shoes);

}

var title = document.querySelectorAll('td');

function buyShoes() {
    document.querySelector('.card-product').addEventListener('click', function () {
        title.forEach(function (element) {
            element.style.color = 'black';
        })
    })

    if (tabShoes.length == 0) {
        title.forEach(function (element) {
            element.style.color = 'red';
        })
    } else if (tabShoes.length !== 0) {
        document.querySelector('.buy').style.background = 'green';
        document.querySelector('.buy').innerHTML = "<span class='fa fa-check'></span> Bought";
        resetParameters();
        // COUNTER FOR RELOADING
        let counter = 2;
        setInterval(function() { 
            document.querySelector('.reload').innerHTML = 'Cette page va se rafraichir dans ' + counter-- + ' secondes'; 
            setInterval(function() { 
                document.querySelector('.reload').innerHTML = 'Cette page va se rafraichir dans ' + counter-- + ' secondes'; 
                if(counter == -1) {
                    setInterval(function() {
                        document.location.reload(true);
                    },500)
                }
            }, 1000);
        }(), 1000);

    }

}

function resetParameters() {
    document.querySelector('.circle').style.background = '#E5BD71';
    // Change SRC image
    document.querySelector('.img>img').setAttribute('src', './vans_PNG29-jaune.png');

    // RESET CLASS ACTIVE OF THE ACTIVE ELEMENT
    document.querySelector('.productSizes>span.active').classList.remove('active');
    document.querySelector('.productColor>span.active').classList.remove('active');

    // RESET CLASS FROM START
    document.querySelector('.productSizes').childNodes[3].classList.add('active');
    document.querySelector('.productColor').childNodes[3].classList.add('active');

    // HIDE VALUE ON SPAN
    document.querySelector('.name').textContent = '';
    document.querySelector('.size').textContent = '';
    document.querySelector('.color').textContent = '';
    document.querySelector('.price').textContent = '';

    // RESET CLICK CLASS OF CONTAINER
    document.querySelector('.container').classList.remove('click');
}

function writeInfos(shoes) {
    let span = document.querySelectorAll(".settings-product span");

    span[0].textContent = shoes.getName();
    span[1].textContent = shoes.getSize();
    span[2].textContent = shoes.getColor();
    span[3].textContent = shoes.getPrice();
}