/* global chrome */

import React, { useEffect, useState } from 'react';

const TEXT = 'Найдено:';

const isAvailable = ({ payload: { status } }) => status === 200;

const options = { active: true, currentWindow: true };

const style = {
    fontSize: '12px',
    background: '#e9ecef',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    padding: '5px',
    overflow: 'hidden',
    backgroundColor: '#e9ecef',
    border: '1px solid #ced4da',
};

const App = () => {
    const [tags, setTags] = useState(null);
    const [isDrawBorder, setDraw] = useState(false);

    const handleDraw = () => setDraw((prev) => !prev);

    const onMouseEnter = (link) => {
        chrome.tabs.query(options, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'draw',
                link,
            });
        });
    };

    const onMouseLeave = () => {
        chrome.tabs.query(options, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'hide',
            });
        });
    };

    useEffect(() => {
        chrome.tabs.query(options, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'getCount' }, (response) => {
                const { tags } = response.payload;
                isAvailable(response) && setTags(tags);
            });
        });
    }, []);

    if (!tags) return null;

    return (
        <div className="row w-100">
            {tags.links.map((link, i) => (
                <div
                    className="col w-100 my-1"
                    onMouseEnter={() => onMouseEnter(link)}
                    onMouseLeave={onMouseLeave}
                >
                    <div className="input-group" key={i}>
                        <div className="input-group-prepend w-100">
                            <div className="input-group-text">
                                <input
                                    value={isDrawBorder}
                                    type="checkbox"
                                    aria-label="Checkbox for following text input"
                                    onChange={handleDraw}
                                />
                            </div>
                            <span style={style}>{link}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default App
