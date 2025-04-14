import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor : React.FC = () =>{
    const [value,setValue] = useState<string>("");

    return(
        <div>
            <h2>Blog Editor</h2>
            <ReactQuill theme="snow"
                value={value}
                onChange={setValue}
                placeholder="Write your blog post here..."
            />
        </div>
    )
}

export default TextEditor;