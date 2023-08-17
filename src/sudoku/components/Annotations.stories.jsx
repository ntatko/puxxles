import React from 'react'
import Annotations from './Annotations'

export default {
  title: 'Sudoku/Annotations',
  component: Annotations,
  tags: ['autodocs'],
  argTypes: {
    numbers: {
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
    }
  },
}

function Template(args) {
  return <div style={{ width: 40, height: 40 }}>
      <Annotations {...args} />
    </div>
}
export const Default = Template.bind({})
Default.args = {
    numbers: [1, 2, 3, 4],
}

export const Empty = Template.bind({})
Empty.args = {
    numbers: [],
}

export const All = Template.bind({})
All.args = {
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
}
