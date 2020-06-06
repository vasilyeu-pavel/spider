const selector = 'div';

const count = [...document.querySelectorAll(selector)].length;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getCount') {
        sendResponse({
            payload: {
                status: 200,
                tags: {
                    count,
                    selector
                },
            }
        });
    }
});
