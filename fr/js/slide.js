var TIMEOUT = 500;
var i = 0;
var interval = setInterval(handleNext, TIMEOUT);

function handleNext() {
    var $radios = $('input[class*="slide-radio"]');
    var $activeRadio = $('input[class*="slide-radio"]:checked');
    var currentIndex = $activeRadio.index();
    var radiosLength = $radios.length;
    console.log(currentIndex);

    $radios.attr('checked', false);

    if (currentIndex >= radiosLength - 1) {
        $radios.first().attr('checked', true);
    } else {
        if (i == 0) {
            clearInterval(interval);
            setInterval(handleNext, 6000);
            i++;
        }
        $activeRadio.next('input[class*="slide-radio"]').attr('checked', true);
    }
}