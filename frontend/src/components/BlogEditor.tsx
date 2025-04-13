// BlogEditor.tsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill styles

const BlogEditor: React.FC = () => {
  const [content, setContent] = useState<string>('');

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = () => {
    // Send 'content' to backend (e.g., via fetch/axios)
    console.log('Blog Content:', content);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-2">Write your Blog</h1>
      <ReactQuill value={content} onChange={handleChange} theme="snow" />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post Blog
      </button>
    </div>
  );
};

export default BlogEditor;
