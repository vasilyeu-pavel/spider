const selector = 'video';

const drawBorder = (link, tags) => {
    const video = tags.find((tag) => tag.src === link);

    if (!video) return;

    const border = 2;

    const withDefaultCSS = (el, name) => {
        const color = 'red';
        el.className = `video-wrapper-${name}`;
        el.style.position = 'absolute';
        el.style.background = color;
    };

    const { x, y, width, height } = video && video.getBoundingClientRect();

    // top
    const top = document.createElement('div');
    withDefaultCSS(top, 'top');
    top.style.top = `${y}px`;
    top.style.left = `${x}px`;
    top.style.width = `${width - border}px`;
    top.style.height = border + 'px';

    // left
    const left = document.createElement('div');
    withDefaultCSS(left, 'left');
    left.style.width = border + 'px';
    left.style.top = `${y}px`;
    left.style.left = `${x}px`;
    left.style.height = `${height - border}px`;

    // right
    const right = document.createElement('div');
    withDefaultCSS(right, 'right');
    right.style.width = border + 'px';
    right.style.top = `${y}px`;
    right.style.left = `${x + width - border}px`;
    right.style.height = `${height - border}px`;

    // bottom
    const bottom = document.createElement('div');
    withDefaultCSS(bottom, 'bottom');
    bottom.style.top = `${y + height - border}px`;
    bottom.style.left = `${x}px`;
    bottom.style.width = `${width - border}px`;
    bottom.style.height = border + 'px';

    // append
    document.body.appendChild(right);
    document.body.appendChild(bottom);
    document.body.appendChild(left);
    document.body.appendChild(top);
};

const removeBorder = () => {
    const names = ['top', 'right', 'left', 'bottom'];
    names.forEach((name) => {
        const border = document.querySelector(`.video-wrapper-${name}`);
        border && border.remove();
    });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const tags = [...document.querySelectorAll(selector)];

    if (request.type === 'getCount') {
        sendResponse({
            payload: {
                status: 200,
                tags: {
                    count: tags.length,
                    selector,
                    links: tags.map(el => el.src)
                },
            }
        });
    }

    if (request.type === 'draw') {
        drawBorder(request.link, tags);
    }
    if (request.type === 'hide') {
        removeBorder();
    }
});
