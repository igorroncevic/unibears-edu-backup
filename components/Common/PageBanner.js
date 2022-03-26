import React from 'react';

const PageBanner = ({ pageTitle }) => {
    return (
        <div className="page-title-area">
            <div className="page-title-content">
                <h2>{pageTitle}</h2>
            </div>
        </div>
    );
}

export default PageBanner;