function compatible(works_min, works_max, tweak_compatibility) {
    let currentiOS = parseFloat(('' + (/CPU.*OS ([0-9_]{1,})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', ''));
    works_min = numerize(works_min);
    // works_max 仅展示测试范围；安装兼容性由包依赖决定，高于该范围不再判定为不兼容。
    let el = document.querySelector('.compatibility');
    if (!el) return;
    if (currentiOS < works_min) {
        el.innerHTML = '你的 iOS 版本过低，此插件不兼容你的设备。本插件兼容 ' + tweak_compatibility + '。';
        el.classList.add('red');
    } else if (String(currentiOS) !== 'NaN') {
        el.innerHTML = '此插件与你当前设备兼容！';
        el.classList.add('green');
    }
}

function numerize(x) {
    if (!x || x.indexOf('.') === -1) {
        return parseFloat(x || '0');
    }
    return parseFloat(x.substring(0, x.indexOf('.')) + '.' + x.substring(x.indexOf('.') + 1).replace('.', ''));
}

function swap(hide, show) {
    for (var i = document.querySelectorAll(hide).length - 1; i >= 0; i--) {
        document.querySelectorAll(hide)[i].style.display = 'none';
    }
    for (var j = document.querySelectorAll(show).length - 1; j >= 0; j--) {
        document.querySelectorAll(show)[j].style.display = 'block';
    }
    var showBtn = document.querySelector('.nav_btn' + show + '_btn');
    var hideBtn = document.querySelector('.nav_btn' + hide + '_btn');
    if (showBtn) showBtn.classList.add('active');
    if (hideBtn) hideBtn.classList.remove('active');
}

function externalize() {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        if (/^https?:/i.test(links[i].href)) {
            links[i].setAttribute('target', '_blank');
            links[i].setAttribute('rel', 'noopener noreferrer');
        }
    }
}

function darkMode(isOled) {
    var darkColor = isOled ? 'black' : '#161616';
    document.querySelector('body').style.color = 'white';
    document.querySelector('body').style.background = darkColor;
    var nodes = document.querySelectorAll('.subtle_link, .subtle_link > div > div, .subtle_link > div > div > p');
    for (var i = nodes.length - 1; i >= 0; i--) {
        nodes[i].style.color = 'white';
    }
}

if (navigator.userAgent.toLowerCase().indexOf('dark') !== -1) {
    darkMode(navigator.userAgent.toLowerCase().indexOf('oled') !== -1 || navigator.userAgent.toLowerCase().indexOf('pure-black') !== -1);
}
