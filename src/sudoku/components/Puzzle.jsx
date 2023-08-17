import React from 'react';
import Cell from './Cell'; // Make sure to adjust the path based on your project structure
import './Puzzle.css'; // Import or define your own styles

const Puzzle = ({ originalPuzzle, solution, enteredPuzzle, annotations }) => {
  const renderRow = (row, rowIndex) => {
    return (
      <div className="row" key={rowIndex}>
        {row.map((number, columnIndex) => (
          <Cell
            key={columnIndex}
            number={enteredPuzzle[rowIndex][columnIndex]}
            desiredNumber={solution[rowIndex][columnIndex]}
            isOriginal={originalPuzzle[rowIndex][columnIndex] !== 0}
            annotations={annotations[rowIndex][columnIndex]}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="puzzle">
      {enteredPuzzle.map((row, rowIndex) => renderRow(row, rowIndex))}
    </div>
  );
};

export default Puzzle;
