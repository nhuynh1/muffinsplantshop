import React from 'react';

const ShopFilters = ({ updateFilters }) => {

    return (
        <div>
            <input type="checkbox" id="Small" />
            <label htmlFor="Small">Small</label>
            <input type="checkbox" id="Mini" />
            <label htmlFor="Mini">Mini</label>
        </div>
    )
}

export { ShopFilters as default };