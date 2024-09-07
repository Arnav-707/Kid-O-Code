import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const Compiler = () => {
    const [code, setCode] = useState('// Write your code here');

    return (
        <CodeMirror
            value={code}
            options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
                readOnly: false, // Ensure the editor is editable
            }}
            onBeforeChange={(editor, data, value) => {
                setCode(value);
            }}
        />
    );
};

export default Compiler;
