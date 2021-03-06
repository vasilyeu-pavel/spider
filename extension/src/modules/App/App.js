/* global chrome */

import React, { useEffect, useState } from 'react';

import CheckBox from '../../components/CheckBox/CheckBox';

import { onMouseEnter, onMouseLeave } from '../../utils/events'
import { getTags, toggleFullScreen, toggleRecord } from '../../utils/API'

const isAvailable = ({ payload: { status } }) => status === 200;

const style = {
    height: '28px',
    fontSize: '12px',
    background: '#e9ecef',
    padding: '5px',
    overflow: 'hidden',
    backgroundColor: '#e9ecef',
    border: '1px solid #ced4da',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
};

const App = () => {
    const [tags, setTags] = useState(null);

    const setTagsCB = (response) => {
        const { tags } = response.payload;
        isAvailable(response) && setTags(tags);
    };

    useEffect(() => {
        getTags(setTagsCB)
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
                                <CheckBox
                                    link={link}
                                    cb={toggleFullScreen}
                                />
                            </div>
                            <span style={style}>{link}</span>
                            <div className="input-group-text">
                                <CheckBox
                                    link={link}
                                    cb={toggleRecord}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default App
