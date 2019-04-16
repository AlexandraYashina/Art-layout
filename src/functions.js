var $ = require("jquery");

function generateRandomNumbers(data, count) {
    let randomNumbers = [];
    while (randomNumbers.length < count) {
        let min = 0,
            max = data.availableImages.length;
        let imageNumber = Math.floor(Math.random() * (max - min)) + min;
        if (!randomNumbers.includes(imageNumber)) {
            randomNumbers.push(imageNumber);
        }
    };
    return randomNumbers;
}

function checkSorted(randomNumbers) {
    for (let i = 0; i < randomNumbers.length; i++) {
        if (randomNumbers[i] > randomNumbers[i + 1]) {
            return false;
        }
        if ((randomNumbers[i + 1] - randomNumbers[i]) > 1) {
            return false;
        }
        if (i == randomNumbers.length - 1) {
            return true;
        }
    }
}

function generateNumbers(data, count) {
    let randomNumbers = generateRandomNumbers(data, count);

    while (checkSorted(randomNumbers)) {
        randomNumbers = generateRandomNumbers(data, count);
    };
    return randomNumbers;
}

function generateImageBlocks(data, imagesContainer, randomImageNumbers) {
    $('#imageBlocks').empty();
    for (let i = 0; i < randomImageNumbers.length; i++) {
        let j = randomImageNumbers[i];
        let imageContainer = $('<div />', {
            class: 'col-lg-3 col-md-6 imageContainer imageContainer_decor',
            id: `image_${i}`
        });
        let imageTitle = $('<div />', {
            text: data.availableImages[j].title,
            class: 'imageContainer__title'
        });
        let image = $('<img />', {
            src: data.availableImages[j].url,
            class: 'imageContainer__image'
        });
        let imageDescr = $('<div />', {
            text: data.availableImages[j].description,
            class: 'imageContainer__descr'
        });
        let imageButton = $('<button />', {
            text: 'Read more',
            type: 'button',
            class: 'btn btn-warning imageContainer__button'
        });
        imageTitle.appendTo(imageContainer);
        image.appendTo(imageContainer);
        imageDescr.appendTo(imageContainer);
        imageButton.appendTo(imageContainer);
        imageContainer.appendTo(imagesContainer);
    }
}

function getWidth() {
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
}

export {
    generateNumbers,
    generateImageBlocks,
    getWidth
}