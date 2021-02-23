document.addEventListener('DOMContentLoaded', () => {
    let replaceSrc = (s) => {
        if(window.CDN_URL === undefined) return s;
        if(s.startsWith('/')) {
            return window.CDN_URL + s;
        } else {
            return s.replace(window.location.origin, window.CDN_URL)
        }
    }
    let replaceUnsplash = (s) => {
        if(window.UNSPLASH_URL === undefined) return s;
        return s.replace('https://images.unsplash.com', window.UNSPLASH_URL);
    }
    document.querySelectorAll('img').forEach(el => {
        el.src = replaceSrc(el.src)
        el.src = replaceUnsplash(el.src)
        let srcset = el.getAttribute('srcset');
        if (srcset) {
            el.setAttribute('srcset', replaceSrc(srcset).replaceAll(window.location.origin, CDN_URL))
        }
        let dataSrc = el.getAttribute('data-src');
        if(dataSrc) {
            el.src = replaceSrc(dataSrc)
        }
        el.setAttribute('loading', 'lazy')
    })
});