var trackLength, throttlescroll, winheight, docheight,
    windowHeight = $(window).height(),
    lineRed = $('.line-red'),
    lineBlue = $('.line-blue'),
    lineOrange = $('.line-orange'),
    lineViolet = $('.line-violet'),
    lineGreen = $('.line-green'),
    previousScroll = 0,
    maxLinesHeight = $('.lines').height(),
    sizeLines = 60, // 60%
    rangeDifference = 200,
    maxSpeed = 800,
    maxDelay = 500;


function setHeightLines () {
    return (windowHeight * sizeLines)/100;
}
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}

function getmeasurements(){
    winheight = window.innerHeight || (document.documentElement || document.body).clientHeight;
    docheight = getDocHeight();
    trackLength = docheight - winheight;
}

function amountscrolled(){
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var pctScrolled = Math.floor(scrollTop/trackLength * 100);
    console.log(scrollTop + 'px scrolled');
    return scrollTop;
}

function checkDirection () {
    var currentScroll = $(this).scrollTop();
    if (currentScroll > previousScroll){
        console.log('down');
    } else {
        console.log('up');
    }
    previousScroll = currentScroll;
}

function randomize (from, to) {
    return Math.floor((Math.random() * to) + from);
}

function linesMove () {
    console.log(amountscrolled());
    lineRed.css(
        'height', setHeightLines()+amountscrolled()+randomize (((rangeDifference/2)*-1), (rangeDifference/2))+'px'
    ).css(
        'transition', randomize (200, maxSpeed)+'ms ease height'
    ).css('max-height', maxLinesHeight);
    lineBlue.css(
        'height', setHeightLines()+amountscrolled()+randomize (((rangeDifference/2)*-1), (rangeDifference/2))+'px'
    ).css(
        'transition', randomize (200, maxSpeed)+'ms ease height'
    ).css('max-height', maxLinesHeight);
    lineOrange.css(
        'height', setHeightLines()+amountscrolled()+randomize (((rangeDifference/2)*-1), (rangeDifference/2))+'px'
    ).css(
        'transition', randomize (200, maxSpeed)+'ms ease height'
    ).css('max-height', maxLinesHeight);
    lineViolet.css(
        'height', setHeightLines()+amountscrolled()+randomize (((rangeDifference/2)*-1), (rangeDifference/2))+'px'
    ).css(
        'transition', randomize (200, maxSpeed)+'ms ease height'
    ).css('max-height', maxLinesHeight);
    lineGreen.css(
        'height', setHeightLines()+amountscrolled()+randomize (((rangeDifference/2)*-1), (rangeDifference/2))+'px'
    ).css(
        'transition', randomize (200, maxSpeed)+'ms ease height'
    ).css('max-height', maxLinesHeight);
}

$(document).ready(function(){

    getmeasurements();
    setHeightLines();
    linesMove();

    $(window).scroll(function(event){

        linesMove();

        //checkDirection();

        amountscrolled();
        // clearTimeout(throttlescroll);
        // throttlescroll = setTimeout(function(){
        //     //amountscrolled();
        //     linesMove();
        // }, 50);
    })
});