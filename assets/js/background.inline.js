(function () {
    var filter = 'linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),';
    let cover_image = window._sys.cover_image;
    if(window.CDN_URL) {
        cover_image = window.CDN_URL + cover_image;
        if(document.body.style.backdropFilter === undefined) {
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
        document.getElementsByTagName('body')[0].classList.add('blur');
        document.getElementsByTagName('body')[0].style.backgroundSize = 'cover';
        document.getElementsByTagName('body')[0].style.backgroundImage = filter + `url(${cover_image})`;
    }
    if (isCached(cover_image)) {
        loadImage();
    } else {
        window.addEventListener('load', loadImage, false);
    }

})()