let init = () => {
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
    let postContent = document.querySelector('.post-content');
    if (postContent) {
        window.addEventListener('scroll', updateNavbar)
        var lastScrollTop = 0;
        function updateNavbar() {

            var navbar = document.getElementById("navbar");
            var navbarDropdown = document.querySelector('.navbar-dropdown')
            var navbarTitle = document.getElementById("navbar-post-title");

            var st = window.pageYOffset || document.documentElement.scrollTop;
            let isScrollDown = st > lastScrollTop;
            lastScrollTop = st <= 0 ? 0 : st;
            if (breakpoint == 'xs') {
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
            if (window.pageYOffset > postContent.offsetTop) {
                navbarDropdown.classList.add('enabled')
                navbar.classList.add("navbar-sticky-title");
            } else {
                navbarDropdown.classList.remove('enabled')
                navbar.classList.remove("navbar-sticky-title");
            }
        }
        let navbarTocToggleButton = document.getElementById('navbar-toc-toggle-button');
        if (navbarTocToggleButton) {
            let dropdown = document.querySelector(`[aria-labelledby="${navbarTocToggleButton.getAttribute('aria-labelledfor')}"]`)
            let navigate = undefined;
            navbarTocToggleButton.addEventListener('click', (e) => {
                if (dropdown.classList.contains('show')) {
                    document.activeElement.blur();
                } else {
                    setInterval(dropdown.classList.add('show'), 1000);
                }
            })
            navbarTocToggleButton.addEventListener('focusout', (e) => {
                dropdown.classList.remove('show')
                console.log(navigate)
                if(navigate) {
                    document.getElementById(navigate.getAttribute('data-labelledfor')).scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    })
                    navigate = undefined;
                }
            })

            // Make toc
            let tocTree = [], currentStack = undefined
            Array.prototype.map.call(postContent.querySelectorAll('h1,h2,h3'), e => [parseInt(e.tagName.substring(1, 2)), e.textContent, e.id])
                .forEach(i => {
                    if (currentStack === undefined) {
                        currentStack = { el: i, children: [] }
                    } else {
                        let cursor = currentStack;
                        while (true) {
                            if (i[0] > cursor.el[0]) {
                                cursor.children.push({
                                    el: i,
                                    children: []
                                })
                                return;
                            } else if (cursor.children.length === 0) {
                                tocTree.push(currentStack), currentStack = { el: i, children: [] };
                                return;
                            } else {
                                cursor = cursor.children[cursor.children.length - 1];
                            }

                        }
                    }
                })
            tocTree.push(currentStack);
            let overlay = document.createElement('div');
            overlay.classList.add('overlay')
            function dfs(array, masterNode, level) {
                if (array.length === 0) return;
                let prefix = '';
                for (let i = 0; i < level; prefix += '\u00A0\u00A0\u00A0', i++);
                for (let el of array) {
                    let link = document.createElement('a');
                    let span = document.createElement('span');
                    span.textContent = el.el[1];
                    link.textContent = prefix;
                    link.setAttribute('href', '#' + el.el[2]);
                    link.setAttribute('data-labelledfor', el.el[2])
                    link.appendChild(span);
                    link.addEventListener('mousemove', () => {
                        console.log(link)
                        navigate = link;
                    });
                    link.addEventListener('mouseleave', () => {
                        if(navigate === link)
                            navigate = undefined;
                    });
                    masterNode.appendChild(link);
                    dfs(el.children, masterNode, level + 1);
                }
            }
            let masterNode = document.querySelector('#post-toc');

            dfs(tocTree, masterNode, 0);
            updateNavbar();
        }

    }

};
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(el => {
        el.src = el.src.replace(window.location.origin, window.CDN_URL ? window.CDN_URL : '/')
                        .replace('https://images.unsplash.com', 'https://res.cloudinary.com/dunikemu8/image/upload/unsplash');
        let srcset = el.getAttribute('srcset');
        el.setAttribute('loading', 'lazy')
        if(srcset) {
            el.setAttribute('srcset', srcset.replace(window.location.origin, CDN_URL))
        }
    })
});
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


