if(window.feedConfig) {
    const sourceIcon = {
        'twitter': 'twitter',
        'instagram': 'instagram',
        'github': 'github',
        'telegram': 'telegram',
        'ncm': 'ncm',
    }
    fetch(window.feedConfig.server + '?' + new URLSearchParams(window.feedConfig))
    .then(res => res.json())
    .then(res => {
        let list = document.getElementById('user-feeds');
        let template = document.getElementsByClassName('feed')[0]
        let imgBaseUrl = window._sys.img_url
        imgBaseUrl = imgBaseUrl.substring(0, imgBaseUrl.indexOf('?'))
        for(let el of res) {
            let feed = template.cloneNode(true);
            feed.querySelector('.feed-icon').setAttribute('src', imgBaseUrl + sourceIcon[el.source] + '.svg')
            feed.querySelector('.feed-icon').setAttribute('alt', el.source)
            feed.querySelector('.feed-title').textContent = el.title
            feed.querySelector('.feed-date').setAttribute('datetime', el.date)
            feed.querySelector('.feed-date').textContent = (new Date(el.date)).toLocaleDateString('en')
            feed.querySelectorAll('.feed-link').forEach(i => i.setAttribute('href', el.link));
            feed.style.display = 'grid';
            list.append(feed);
        }
    })
}
