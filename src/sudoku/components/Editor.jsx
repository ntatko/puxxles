import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const Editor = ({ code, onChange }) => {

    return (
        <MonacoEditor
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={onChange}
        />
    );
}

export default Editor;