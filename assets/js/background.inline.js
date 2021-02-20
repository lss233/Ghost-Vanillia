(function () {
    let cover_image = window._sys.cover_image;
    if (window.CDN_URL) {
        cover_image = window.CDN_URL + cover_image;
        if (document.body.style.backdropFilter === undefined) {
            cover_image = cover_image.replace('upload/', '/upload/e_saturation:80,e_blur:800/')
        }
    }
    function isCached(src) {
        var img = new Image();
        img.src = src;
        var complete = img.complete;
        img.src = "";
        return complete;
    }
    function loadImage() {
        var filter = window._sys.colorMode == 'dark' ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),' : 'linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),';
        document.getElementsByTagName('body')[0].classList.add('blur');
        document.getElementsByTagName('body')[0].style.backgroundSize = 'cover';
        document.getElementsByTagName('body')[0].style.backgroundImage = filter + `url(${cover_image})`;
    }
    window._sys.loadBackgroundImage = loadImage;
    if (isCached(cover_image)) {
        loadImage();
    } else {
        window.addEventListener('load', loadImage, false);
    }

})()