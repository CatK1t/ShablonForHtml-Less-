// Функция для кроссбраузерности (для браузеров которые не поддерживают calc())

window.onload = function(){
    
    if(!checkCalc()){
        var style = document.createElement('link');
        style.setAttribute('rel','stylesheet');
        style.setAttribute('href','css/style-nocalc.css');
        document.body.appendChild(style);
    }

}

function checkCalc(){
    var div = document.createElement('div');
    div.style.cssText = 'width: calc(100%)';
    return div.style.length > 0;
}

// Конец проверки

