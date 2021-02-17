(function () {

})()
window.addEventListener('load', () => {
    let breakpoint = (function () {
        let breakpoints = {
            '(min-width: 1200px)': 'xl',
            '(min-width: 992px) and (max-width: 1199.98px)': 'lg',
            '(min-width: 768px) and (max-width: 991.98px)': 'md',
            '(min-width: 576px) and (max-width: 767.98px)': 'sm',
            '(max-width: 575.98px)': 'xs',
        }

        for (let media in breakpoints) {
            if (window.matchMedia(media).matches) {
                return breakpoints[media];
            }
        }

        return null;
    })()
    console.log(breakpoint)

    // Initialize sticky navbar
    let postContent = document.getElementsByClassName('post-content')[0];
    if (postContent) {
        window.addEventListener('scroll', updateNavbar)
        var lastScrollTop = 0;
        function updateNavbar() {

            var navbar = document.getElementById("navbar");
            var navbarTitle = document.getElementById("navbar-post-title");

            var st = window.pageYOffset || document.documentElement.scrollTop;
            let isScrollDown = st > lastScrollTop;
            lastScrollTop = st <= 0 ? 0 : st;
            if(breakpoint == 'xs') {
                navbar.classList.remove("navbar-sticky");
                return;
            }

            navbarTitle.textContent = document.getElementById('post-title').textContent;
            var sticky = navbar.offsetTop;
            if (window.pageYOffset >= sticky + 52) {
                navbar.classList.add("navbar-sticky")
            } else {
                navbar.classList.remove("navbar-sticky");
            }
            if (window.pageYOffset >= postContent.offsetTop) {
                navbar.classList.add("navbar-sticky-title");
            } else {
                navbar.classList.remove("navbar-sticky-title");
            }
        }
        updateNavbar();
    }

});