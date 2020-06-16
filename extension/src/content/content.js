const selector = 'video';

const onFullScreen = async (link, tags) => {
    const video = tags.find((tag) => tag.src === link);

    if (!video) return;

    await video.requestFullscreen()
};

const offFullScreen = async (link, tags) => {
    const video = tags.find((tag) => tag.src === link);

    if (!video) return;

    await video.exitFullscreen()
};

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

const getCount = (tags) => ({
    payload: {
        status: 200,
        tags: {
            count: tags.length,
            selector,
            links: tags.map(el => el.src)
        },
    }
});

const startRecord = (link, tags) => {
    const video = tags.find((tag) => tag.src === link);

    if (!video) return;

    console.log('startRecord')
};

const stopRecord = (link, tags) => {
    const video = tags.find((tag) => tag.src === link);

    if (!video) return;

    console.log('stopRecord')
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const tags = [...document.querySelectorAll(selector)];

    console.log(JSON.stringify(request, null, 4));

    switch (request.type) {
        case 'getCount': {
            sendResponse(getCount(tags));
            break;
        }
        case 'draw': {
            drawBorder(request.link, tags);
            break;
        }
        case 'hide': {
            removeBorder();
            break;
        }
        case 'onFullScreen': {
            onFullScreen(request.link, tags);
            break;
        }
        case 'offFullScreen': {
            offFullScreen(request.link, tags);
            break;
        }
        case 'startRecord': {
            startRecord(request.link, tags);
            break;
        }
        case 'stopRecord': {
            stopRecord(request.link, tags);
            break;
        }
    }
});
