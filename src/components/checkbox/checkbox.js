import React from 'react';
import styles from './checkbox.module.css';

const Checkbox = ({ isSelected, onChangeHandler, label }) => {
    const id = label.replace(/\s+/g, '');
    return (
        <div className={styles.checkboxWrap}>
            <input
                className={`screen-reader-only ${styles.checkbox__input}`}
                type="checkbox"
                id={id}
                checked={isSelected}
                onChange={onChangeHandler} />
            <label 
                className={styles.checkbox__label}
                htmlFor={id}>
                <span className={styles.checkbox__custom }></span>
                {label}
            </label>
        </div>
    )
}

export { Checkbox as default };