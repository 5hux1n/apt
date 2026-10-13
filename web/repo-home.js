(function () {
    var input = document.getElementById('search-input');
    var search = document.getElementById('search-morph');
    var trigger = document.getElementById('search-toggle');
    var close = document.getElementById('search-close');
    var tabs = Array.from(document.querySelectorAll('.environment-tab'));
    var panels = Array.from(document.querySelectorAll('.package-section'));
    var cards = Array.from(document.querySelectorAll('.package-entry'));
    var empty = document.getElementById('empty-state');
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var active = tabs.find(function (tab) { return tab.getAttribute('aria-selected') === 'true'; }) || tabs[0];
    var readyTimer;
    if (!input || !active) return;

    function filter() {
        var query = input.value.trim().toLowerCase();
        cards.forEach(function (card) {
            var text = [card.dataset.name, card.dataset.bundle, card.dataset.developer,
                card.dataset.section, card.dataset.env, card.dataset.arch].join(' ').toLowerCase();
            card.hidden = query !== '' && !text.includes(query);
        });
        var count = 0;
        panels.forEach(function (panel) {
            panel.hidden = panel.dataset.sectionName !== active.dataset.environment;
            if (!panel.hidden) count += panel.querySelectorAll('.package-entry:not([hidden])').length;
        });
        empty.style.display = count === 0 ? 'block' : 'none';
    }

    function select(tab) {
        active = tab;
        tabs.forEach(function (item) {
            var selected = item === tab;
            item.setAttribute('aria-selected', String(selected));
            item.tabIndex = selected ? 0 : -1;
        });
        filter();
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

    function finishOpening() {
        clearTimeout(readyTimer);
        if (!search.classList.contains('is-open')) return;
        search.classList.add('is-ready');
        input.disabled = false;
        input.tabIndex = 0;
        close.tabIndex = 0;
        input.focus({ preventScroll: true });
    }
    function openSearch() {
        if (search.classList.contains('is-ready')) { input.focus(); return; }
        clearTimeout(readyTimer);
        search.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        trigger.setAttribute('aria-label', '搜索插件');
        if (motion.matches) finishOpening();
        else readyTimer = setTimeout(finishOpening, 400);
    }
    function closeSearch(returnFocus) {
        clearTimeout(readyTimer);
        input.value = '';
        filter();
        input.disabled = true;
        input.tabIndex = -1;
        close.tabIndex = -1;
        search.classList.remove('is-ready', 'is-open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-label', '展开搜索');
        if (returnFocus) trigger.focus({ preventScroll: true });
    }
    search.addEventListener('transitionend', function (event) {
        if (event.target === search && event.propertyName === 'width') finishOpening();
    });
    trigger.addEventListener('click', openSearch);
    close.addEventListener('click', function () { closeSearch(true); });
    input.addEventListener('input', filter);
    search.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') { event.preventDefault(); closeSearch(true); }
    });
    select(active);
})();
