/* global chrome */

import { options } from './config'

export const onMouseEnter = (link) => {
    chrome.tabs.query(options, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: 'draw',
            link,
        });
    });
};

export const onMouseLeave = () => {
    chrome.tabs.query(options, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: 'hide',
        });
    });
};
