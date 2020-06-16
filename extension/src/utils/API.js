/* global chrome */

import { options } from './config'

export const getTags = (cb) => {
    chrome.tabs.query(options, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'getCount' }, cb)
    });
};

export const toggleFullScreen = (status, link) => {
    chrome.tabs.query(options, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: status ? 'onFullScreen' : 'offFullScreen',
            link,
        })
    });
};

export const toggleRecord = (status, link) => {
    chrome.tabs.query(options, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: status ? 'startRecord' : 'stopRecord',
            link,
        })
    });
};
