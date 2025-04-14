/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-hot-toast";

const TextEditor: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [tags, setTags] = useState<any[]>([]); 
    const [selectedTags, setSelectedTags] = useState<any[]>([]);
    const [newTag, setNewTag] = useState<string>("");

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/tags", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    setTags(data);
                } else {
                    toast.error(data.message || "Failed to fetch tags");
                }
            } catch (error) {
                toast.error("Error fetching tags");
                console.error("Error fetching tags", error);
            }
        };

        fetchTags();
    }, []);

    const handleCreateTag = async () => {
        if (!newTag) {
            toast.error("Tag name is required!");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/tags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ name: newTag }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Tag created successfully!");
                setTags((prevTags) => [...prevTags, data]);
                setNewTag("");
            } else {
                toast.error(data.message || "Failed to create tag");
            }
        } catch (error) {
            console.error("Error creating tag", error);
            toast.error("Error creating tag");
        }
    };

    const handlePublish = async () => {
        if (!title || !value || selectedTags.length === 0) {
            toast.error("Title, content, and at least one tag are required!");
            return;
        }

        const loadingToast = toast.loading("Creating blog...");

        try {
            const res = await fetch("http://localhost:8000/api/createBlog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ title, content: value, tags: selectedTags }),
            });

            const blog = await res.json();

            if (!res.ok) {
                toast.error(blog.message || "Failed to create blog", { id: loadingToast });
                return;
            }

            const assignTag = await fetch(`http://localhost:8000/api/blogs/${blog.id}/tags`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body:JSON.stringify({ tagIds: selectedTags })
            })

            const assignTagRes = await assignTag.json();

            if (!assignTag.ok) {
                toast.error(assignTagRes.message || "Failed to assign tags", { id: loadingToast });
                return;
            }

            const publishRes = await fetch("http://localhost:8000/api/publishBlog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ blogId: blog.id }),
            });

            const publishResult = await publishRes.json();

            if (!publishRes.ok) {
                toast.error(publishResult.message || "Failed to publish blog", { id: loadingToast });
                return;
            }

            toast.success("Blog published successfully!", { id: loadingToast });
            setValue("");
            setTitle("");
            setSelectedTags([]);
        } catch (error) {
            console.error("Error publishing blog:", error);
            toast.error("Something went wrong", { id: loadingToast });
        }
    };

    // Handle tag selection with checkboxes
    const toggleTag = (tagId: string) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter(id => id !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Blog Post</h1>
            
            <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
                <input
                    id="title"
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter a captivating title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <div className="border rounded-lg overflow-hidden">
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        placeholder="Write your blog post here..."
                        className="h-64"
                    />
                </div>
            </div>

            {/* Tag management section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                        <div key={tag.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`tag-${tag.id}`}
                                checked={selectedTags.includes(tag.id)}
                                onChange={() => toggleTag(tag.id)}
                                className="mr-1"
                            />
                            <label 
                                htmlFor={`tag-${tag.id}`}
                                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                                    selectedTags.includes(tag.id) 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {tag.name}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 mt-3">
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Create new tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCreateTag()}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={handleCreateTag}
                    >
                        Add Tag
                    </button>
                </div>
            </div>

            {/* Preview section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Preview</h2>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    {title && <h3 className="text-xl font-bold mb-3">{title}</h3>}
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: value }} />
                    {!value && <p className="text-gray-400 italic">Your content preview will appear here...</p>}
                </div>
            </div>

            <div className="flex justify-between items-center">
                <button
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    onClick={() => {
                        setValue("");
                        setTitle("");
                        setSelectedTags([]);
                    }}
                >
                    Clear
                </button>
                
                <button
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all font-medium"
                    onClick={handlePublish}
                >
                    Publish Blog
                </button>
            </div>
        </div>
    );
};

export default TextEditor;