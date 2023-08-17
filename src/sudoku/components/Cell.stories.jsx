import React from 'react'
import Cell from './Cell'

export default {
  title: 'Sudoku/Cell',
  component: Cell,
  tags: ['autodocs'],
  argTypes: {
    number: {
        control: {
            type: 'number'
        },
        description: 'The number that is currently in the cell. If the cell is empty, this should be 0.',
        table: {
            type: {
                summary: 'number',
            },
            defaultValue: {
                summary: '0',
            },
        },
    },
    desiredNumber: {
        control: {
            type: 'number'
        },
        description: 'The number that should be in the cell.',
        table: {
            type: {
                summary: 'number',
            },
            defaultValue: {
                summary: '0',
            },
        },
    },
    isOriginal: {
        control: {
            type: 'boolean'
        },
        description: 'Whether or not the number in the cell is part of the original puzzle.',
        table: {
            type: {
                summary: 'boolean',
            },
            defaultValue: {
                summary: 'false',
            },
        },
    },
    annotations: {
        control: {
            type: 'array'
        },
        description: 'An array of numbers that should be displayed as annotations in the cell.',
        table: {
            type: {
                summary: 'array',
            },
            defaultValue: {
                summary: '[]',
            },
        },
    },
  },
}

function Template(args) {
  return <Cell {...args} />
}
export const Default = Template.bind({})
Default.args = {
    number: 4,
    desiredNumber: 4,
    isOriginal: false,
    annotations: [],
}

export const Empty = Template.bind({})
Empty.args = {
    number: 0,
    desiredNumber: 4,
    isOriginal: false,
    annotations: [],
}

export const Original = Template.bind({})
Original.args = {
    number: 4,
    desiredNumber: 4,
    isOriginal: true,
    annotations: [],
}

export const Incorrect = Template.bind({})
Incorrect.args = {
    number: 5,
    desiredNumber: 4,
    isOriginal: false,
    annotations: [],
}

export const Annotations = Template.bind({})
Annotations.args = {
    number: 0,
    desiredNumber: 4,
    isOriginal: false,
    annotations: [1, 2, 3],
}

export const AnnotationsAndNumber = Template.bind({})
AnnotationsAndNumber.args = {
    number: 4,
    desiredNumber: 4,
    isOriginal: false,
    annotations: [1, 2, 3],
}