import React from "react";
import CheckBox from "../../modules/App/App";

import { onMouseEnter, onMouseLeave } from "../../utils/events";
import { toggleFullScreen, toggleRecord } from "../../utils/API";

import { style } from './style'

const List = ({ tags }) => {
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

export default List
