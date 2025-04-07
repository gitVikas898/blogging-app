import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogType } from "../utils/types";
import Spinner from "../components/Spinner";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
      }
    };
  
    getBlog();
  }, [id]); 

  if (!blog) return <Spinner size={40}/>

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-2">By {blog.author.username}</p>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="text-lg leading-relaxed">{blog.content}</div>
    </div>
  );
}

export default BlogDetail;
