import React from 'react'
import Puzzle from './Puzzle'

export default {
  title: 'Sudoku/Puzzle',
  component: Puzzle,
  tags: ['autodocs'],
  argTypes: {
    originalPuzzle: {
        control: {
            type: 'array'
        },
        description: 'The original puzzle, with 0s representing empty cells.',
        table: {
            type: {
                summary: 'array of arrays of numbers',
            },
        },
    },
    solution: {
        control: {
            type: 'array'
        },
        description: 'The solution to the puzzle.',
        table: {
            type: {
                summary: 'array of arrays of numbers',
            },
        },
    },
    enteredPuzzle: {
        control: {
            type: 'array'
        },
        description: 'The puzzle as it has been entered by the user.',
        table: {
            type: {
                summary: 'array of arrays of numbers',
            },
        },
    },
    annotations: {
        control: {
            type: 'array'
        },
        description: 'An array of arrays of numbers that should be displayed as annotations in the cell.',
        table: {
            type: {
                summary: 'array of arrays of arrays of numbers',
            },
        },
    },
  },
}

function Template(args) {
  return <div style={{ width: 40, height: 40 }}>
      <Puzzle {...args} />
    </div>
}
export const Default = Template.bind({})
Default.args = {
    originalPuzzle: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    solution: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    enteredPuzzle: [
        [5, 3, 0, 0, 7, 0, 0, 1, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [1, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 6, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 1, 0, 0, 0, 2, 8, 0],
        [0, 7, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 1, 7, 9],
    ],
    annotations: [
        [[],[],[1,2],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[2,7]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
    ],
}
