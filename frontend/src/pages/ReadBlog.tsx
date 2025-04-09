import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogType, CommentType } from "../utils/types";
import Spinner from "../components/Spinner";
import CommentSection from "../components/CommentSection";
import { BiBookmark, BiHeart } from "react-icons/bi";
import AuthGuard from "../utils/AuthGuard";
import { motion } from 'framer-motion';

function BlogDetail() {
  const { id } = useParams();
  const blogId = Number(id);
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [comments,setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const getBlogAndComments = async () => {
      try {
        const [blogRes,commentRes] = await Promise.all([
          fetch(`http://localhost:8000/api/blogs/${id}`),
          fetch(`http://localhost:8000/api/blog/${blogId}/comments`)
          ]);
        const blogdata = await blogRes.json();
        const commentData = await commentRes.json();

        setBlog(blogdata);
        setComments(commentData);

      } catch (err) {
        console.error(err);
      }
    };
  
    getBlogAndComments();
  }, [blogId,id]); 

  if (!blog) return <Spinner size={40}/>

  return (
    <motion.div 
    initial={{ opacity: 0, y: 50 }} // Start faded and slightly below
    animate={{ opacity: 1, y: 0 }}   // Animate to full opacity and original position
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="max-w-3xl mx-auto p-6 min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 mb-2">By {blog.author.username}</p>
        <p className="text-sm text-gray-500 mb-6">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="text-lg leading-relaxed">{blog.content}</div>
      <div className="flex items-center justify-end gap-2">
          <AuthGuard isAuthenticated={false}>
            <p className="flex items-center gap-1"><BiHeart/>{blog._count.Like ?? 0}</p>
          </AuthGuard>
          <AuthGuard isAuthenticated={false}>
            <p><BiBookmark/></p>
          </AuthGuard>
      </div>
      <CommentSection comments={comments} blogId={blogId} isAuthenticated={false}/>
    </motion.div>
  );
}

export default BlogDetail;
