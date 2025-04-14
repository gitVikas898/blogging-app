// BlogDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogType, CommentType } from "../utils/types";
import Spinner from "../components/Spinner";
import CommentSection from "../components/CommentSection";
import { BiBookmark, BiHeart } from "react-icons/bi";
import AuthGuard from "../utils/AuthGuard";
import { motion } from 'framer-motion';
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import DOMPurify from 'dompurify';
import 'highlight.js/styles/github.css';

function BlogDetail() {
  const { id } = useParams();
  const blogId = Number(id);
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [likeCount, setLikeCount] = useState(blog?._count.Like ?? 0);
  const [isLiked, setIsLiked] = useState(false);
  const { token } = useAuthStore();

  const handleToggleLike = async () => {
    const loadingToast = toast.loading("Processing...");
    try {
      const res = await fetch("http://localhost:8000/api/blog/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ blogId }),
      });
      const result = await res.json();
      if (res.ok) {
        setLikeCount(result.likeCount);
        setIsLiked((prev) => !prev);
        toast.dismiss(loadingToast);
        toast.success(result.message);
      } else {
        console.error(result.message);
        toast.dismiss(loadingToast);
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Failed To toggle Like", err);
      toast.dismiss(loadingToast);
      toast.error("Network error");
    }
  };

  useEffect(() => {
    const getBlogAndComments = async () => {
      try {
        const [blogRes, commentRes] = await Promise.all([
          fetch(`http://localhost:8000/api/blogs/${id}`, {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            }
          }),
          fetch(`http://localhost:8000/api/blog/${blogId}/comments`)
        ]);
        const blogdata = await blogRes.json();
        const commentData = await commentRes.json();

        setBlog(blogdata);
        setComments(commentData);
        setLikeCount(blogdata._count?.Like);
        setIsLiked(blogdata.hasLiked || false);
      } catch (err) {
        console.error(err);
      }
    };
    getBlogAndComments();
  }, [blogId, id, token]);

  if (!blog) return <Spinner size={40} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto p-6 min-h-[80vh] prose prose-lg prose-slate dark:prose-invert"
    >
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <div className="flex items-center justify-between">
        <p className="text-gray-600">By {blog.author.username}</p>
        <p className="text-gray-600">{blog.readingTime === null ? "1 min" : `${blog.readingTime} min`}</p>
        <p className="text-sm text-gray-500">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Rich HTML Content */}
      <div
        className="mt-6"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
      />

      <div className="flex items-center justify-end gap-2">
        <AuthGuard isAuthenticated={isAuthenticated}>
          <button
            onClick={handleToggleLike}
            className="flex items-center gap-1 text-red-500 cursor-pointer hover:text-red-700"
          >
            <BiHeart className={isLiked ? "fill-current" : ""} />{likeCount}
          </button>
        </AuthGuard>
        <AuthGuard isAuthenticated={isAuthenticated}>
          <p><BiBookmark /></p>
        </AuthGuard>
      </div>

      <CommentSection comments={comments} blogId={blogId} isAuthenticated={isAuthenticated} />
    </motion.div>
  );
}

export default BlogDetail;
