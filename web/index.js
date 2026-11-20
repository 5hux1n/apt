function detailTabsInit() {
    var tabs = Array.from(document.querySelectorAll('.nav [role="tab"]'));
    function select(tab) {
        tabs.forEach(function (item) {
            var selected = item === tab;
            item.classList.toggle('active', selected);
            item.setAttribute('aria-selected', String(selected));
            item.tabIndex = selected ? 0 : -1;
            document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
        });
    }
    tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () { select(tab); });
        tab.addEventListener('keydown', function (event) {
            var next;
            if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
            if (event.key === 'ArrowLeft') next = tabs[(index + tabs.length - 1) % tabs.length];
            if (event.key === 'Home') next = tabs[0];
            if (event.key === 'End') next = tabs[tabs.length - 1];
            if (next) { event.preventDefault(); select(next); next.focus(); }
        });
    });
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

detailTabsInit();
externalize();
if (navigator.userAgent.toLowerCase().indexOf('dark') !== -1) {
    darkMode(navigator.userAgent.toLowerCase().indexOf('oled') !== -1 || navigator.userAgent.toLowerCase().indexOf('pure-black') !== -1);
}
