/* global chrome */

import React, { useEffect, useState } from 'react';

const TEXT = 'Найдено:';

const isAvailable = ({ payload: { status } }) => status === 200;

const App = () => {
    const [tags, setTags] = useState(null);

    useEffect(() => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'getCount' }, (response) => {
                const { tags } = response.payload;
                isAvailable(response) && setTags(tags);
            });
        });
    }, []);

    if (!tags) return null;

    return (
        <div className="row w-100 m-3">
            <div className="col-12 d-flex justify-content-between">
                <p>
                    {TEXT}
                    <span className="badge badge-pill badge-info mx-2">{tags.count}</span>
                    {tags.selector}
                </p>
            </div>
            <div className="col w-100">
                <button type="button" className="btn btn-success btn-sm">
                    Кнопка
                </button>
            </div>
        </div>

    )
};

export default App
