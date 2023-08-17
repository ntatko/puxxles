import React from 'react'
import Editor from './Editor'

export default {
    title: 'Sudoku/Editor',
    component: Editor,
    tags: ['autodocs'],
    argTypes: {
        code: {
            control: {
                type: 'string'
            },
            description: 'The code that should be displayed in the editor.',
            table: {
                type: {
                    summary: 'string',
                },
                defaultValue: {
                    summary: '""',
                },
            },
        },
        onChange: {
            control: {
                type: 'function'
            },
            description: 'A function that will be called when the code in the editor changes.',
            table: {
                type: {
                    summary: 'function',
                },
            },
        },
    },
}

function Template(args) {
    return <div style={{ height: 500 }}>
        <Editor {...args} />
    </div>
}
export const Default = Template.bind({})
Default.args = {
    code: '',
    onChange: () => { },
}
