import React from 'react';

const Checkbox = ({ isSelected, onChangeHandler, label }) => {
    const id = label.replace(/\s+/g, '');
    return (
        <>
            <input
                type="checkbox"
                id={id}
                checked={isSelected}
                onChange={onChangeHandler} />
            <label htmlFor={id}>{label}</label>
        </>
    )
}

export { Checkbox as default };