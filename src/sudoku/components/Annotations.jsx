import React from 'react';
import './Annotations.css'; // Import or define your own styles

const Annotations = ({ numbers }) => {
  return (
    <div className="annotations">
      {[0, 1, 2].map((row) => (
        <div key={row} className="annotations-row">
          {[1, 2, 3].map((col) => (
            <div
              key={col}
              className={`annotation-cell`}
            >
              {numbers.includes(row * 3 + col) ? row * 3 + col : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Annotations;
