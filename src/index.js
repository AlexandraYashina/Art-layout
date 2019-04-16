import './styles/style.scss';
var $ = require("jquery");
require('bootstrap');

import {
    generateNumbers,
    generateImageBlocks,
    getWidth
} from './functions'

$(document).ready(function () {
    let imagesContainer = $('#imageBlocks');

    function getImages(imagesContainer) {
        $.ajax({
            type: 'GET',
            url: './json/images.json',
            context: this,
            dataType: 'json',
            success: function (data) {
                let randomImageNumbers = generateNumbers(data, 4);
                generateImageBlocks(data, imagesContainer, randomImageNumbers);
            },
            error: function (err) {
                console.log(err.status);
            }
        });
    }
    getImages(imagesContainer);
    $('.nav-link').click(function () {
        $('#imageBlocks').fadeOut(400);
        setTimeout(function () {
            getImages(imagesContainer);
            $('#imageBlocks').fadeIn(400);
        }, 400);
        $(document).bind('mousemove keydown scroll', function () {
            setImageShiftForScreen(direction);
        });
    });

    function sliderShift(i, marginParametr, direction) {
        let firstSign;
        let secondSign;
        if (direction == 'left') {
            firstSign = '-';
            secondSign = '+';
        } else {
            firstSign = '+';
            secondSign = '-';
        }
        if (i == 0) {
            var imageBlocksCopy = $('#imageBlocks').clone().attr('id', 'imageBlocks_copy');
            imageBlocksCopy.appendTo($('.imageBlocks'));
            $('#imageBlocks').css('margin-right', `${secondSign}${i}px`).css('margin-left', `${firstSign}${i}px`);
            $('#imageBlocks_copy').css('margin-right', `${firstSign}${marginParametr-i}px`).css('margin-left', `${secondSign}${marginParametr-i}px`);
        }
        $('#imageBlocks').css('margin-right', `${secondSign}${i}px`).css('margin-left', `${firstSign}${i}px`);
        $('#imageBlocks_copy').css('margin-right', `${firstSign}${marginParametr-i}px`).css('margin-left', `${secondSign}${marginParametr-i}px`);
        if (i == marginParametr) {
            $('#imageBlocks_copy').remove();
            $('#imageBlocks').css('margin-right', `0`).css('margin-left', `0`);
        }
    };

    let idleTimer = null;
    let idleWait = 60000;
    let direction = 'left';

    function setImageShift(marginParametr, direction) {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(function () {
            let i = 0;
            var timerId = setInterval(function () {
                sliderShift(i, marginParametr, direction);
                i++;
                if (i == marginParametr) {
                    sliderShift(i, marginParametr, direction);
                    i = 0;
                }
            }, 8);
            $("body").on('mousemove keydown scroll', function () {
                clearInterval(timerId);
                $('#imageBlocks_copy').remove();
                $('#imageBlocks').css('margin-right', `0`).css('margin-left', `0`);
            });
            $('#imageBlocksDirection').on('click', function imageBlocksAlignement() {
                clearInterval(timerId);
                $('#imageBlocks_copy').remove();
                $('#imageBlocks').css('margin-right', `0`).css('margin-left', `0`);
                $('#imageBlocksDirection').off('click', imageBlocksAlignement);
                if (direction == 'left') {
                    direction = 'right';
                    for (let i = 3; i >= 0; i--) {
                        let imageBlock = $(`#image_${i}`);
                        imageBlock.appendTo($('#imageBlocks'));
                    }
                } else {
                    direction = 'left';
                    for (let i = 3; i >= 0; i--) {
                        let imageBlock = $(`#image_${i}`);
                        imageBlock.prependTo($('#imageBlocks'));
                    }
                }
                $("body").off('mousemove keydown scroll');
                $(document).unbind('mousemove keydown scroll');
                setImageShiftForScreen(direction);
            });
        }, idleWait);
    }

    function setImageShiftForScreen(direction) {
        if (getWidth() > 1200) {
            setImageShift(1100, direction);
        };
        if ((getWidth() > 992) && (getWidth() < 1200)) {
            setImageShift(940, direction);
        }
    };

    $(document).bind('mousemove keydown scroll', function () {
        setImageShiftForScreen(direction);
    });

    $(window).on('resize', function () {
        $(document).bind('mousemove keydown scroll', function () {
            setImageShiftForScreen(direction);
        });
    });
});