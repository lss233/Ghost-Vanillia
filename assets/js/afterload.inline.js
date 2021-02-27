(function () {
    function loadContent() {
        let style = document.createElement('style');
        document.head.appendChild(style);
        Array.prototype.forEach.call(document.getElementsByClassName('afterload-placeholder'), i => i.style.display = 'none')
        Array.prototype.forEach.call(document.getElementsByClassName('afterload'), i => i.classList.remove('afterload'))
    }
    window._forceLoad = loadContent
    window.addEventListener('load', () => setTimeout(loadContent, 10))
    window.addEventListener('load', () => {
        if(!window._sys.postloadScript) {
            window._sys.postloadScript = [
                ['//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/highlight.min.js', () => {
                    document.querySelectorAll('pre code').forEach((block) => {
                        hljs.highlightBlock(block);
                    });
                    hljs.initHighlightingOnLoad();
                }]
            ]
        }
        if(window.disqus_domain) {
            window._sys.postloadScript.push([`//${disqus_domain}/count.js`, null])
        }
        
        !function (e, t, r) { function n() { for (; d[0] && "loaded" == d[0][f];)c = d.shift(), c[o] = !i.parentNode.insertBefore(c, i) } for (var s, a, c, d = [], i = e.scripts[0], o = "onreadystatechange", f = "readyState"; s = r.shift();)a = e.createElement(t), "async" in i ? (a.async = !1, e.head.appendChild(a)) : i[f] ? (d.push(a), a[o] = n) : e.write("<" + t + ' src="' + s[0] + '" defer></' + t + ">"), a.src = s[0], a.onload = s[1] }
        (document, "script", window._sys.postloadScript)
    });
})();
// Code from https://github.com/jjranalli/nightwind/blob/main/helper.js
(function () {
    function getInitialColorMode() {
        const persistedColorPreference = window.localStorage.getItem('nightwind-mode');
        const hasPersistedPreference = typeof persistedColorPreference === 'string';
        if (hasPersistedPreference) {
            return persistedColorPreference;
        }
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';
        if (hasMediaQueryPreference) {
            return mql.matches ? 'dark' : 'light';
        }
        return 'light';
    }
    function toggleColorMode () {
        if (!document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark');
            window.localStorage.setItem('nightwind-mode', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            window.localStorage.setItem('nightwind-mode', 'light');
        }
        window._sys.colorMode = getInitialColorMode()
        if(window._sys.loadBackgroundImage) {
            window._sys.loadBackgroundImage();
        }
    }
    window._sys.toggleColorMode = toggleColorMode;
    (window._sys.colorMode = getInitialColorMode()) == 'light' ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark');
    document.documentElement.classList.add('nightwind');
})()