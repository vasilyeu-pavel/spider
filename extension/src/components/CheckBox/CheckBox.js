import React, { useState } from 'react';

const CheckBox = ({ link, cb }) => {
    const [isCheck, setCheck] = useState(false);

    const handleSelectedTag = () => setCheck(prev => !prev);

    return (
        <input
            value={isCheck}
            type="checkbox"
            aria-label="Checkbox for following text input"
            onChange={() => {
                handleSelectedTag();
                cb(!isCheck, link)
            }}
        />
    )
};

export default CheckBox;
