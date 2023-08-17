import React from 'react';
import Annotations from './Annotations';
import './Cell.css'; // Import or define your own styles

const Cell = ({ number, desiredNumber, isOriginal, annotations }) => {
    const classNames = ['number'];
    if (isOriginal) classNames.push('original');
    if (number !== desiredNumber && number !== 0) classNames.push('incorrect');

    return (
        <div className="cell">
            <div className={classNames.join(' ')}>
                {number !== 0 ? (
                    number
                ) : (
                    <Annotations numbers={annotations} />
                )}
            </div>
        </div>
    );
};

export default Cell;