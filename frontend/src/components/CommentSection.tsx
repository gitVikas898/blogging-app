import { useEffect, useState } from "react";
import { BlogCommentProps } from '../utils/types';
import { BiUser } from "react-icons/bi";
import { useAuthStore } from "../store/useAuthStore";

const CommentSection = ({
    blogId,
    comments,
    isAuthenticated,
    onNewComment
}: BlogCommentProps) => {
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [commentList, setCommentList] = useState(comments);
    const { token } = useAuthStore();
    const handleSubmit = async () => {

        if (!newComment.trim()) {
            return;
        }
       
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8000/api/blog/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" :"Bearer "+token
                },
                body: JSON.stringify({
                    content: newComment,
                    blogId: blogId
                })
            })

            if (res.ok) {
                const result = await res.json()
              
                setNewComment("");
                setCommentList(prev => [result, ...prev])
                onNewComment?.();
            } else {
                console.error("Failed to post comment")
            }
        } catch (error) {
            console.error("Failed Posting Comment", error);
        } finally {
            setLoading(false);
        }
    }
    console.log("This is comment list",commentList)
    useEffect(()=>{
        setCommentList(comments)
    },[comments])


    return (
        <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            {/* Render Existing comments */}
            {commentList.length > 0 ? (
                <div  className="space-y-3">
                    {commentList.map((comment) => (
                        <div key={comment.id} className="text-sm bg-gray-100 p-2 rounded-md grid gap-2">
                            <div className="flex items-center justify-between">
                                <p className="flex items-center gap-1"><BiUser/>{comment?.user?.username}</p>
                                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                            </div>
                            <p>{comment?.content}</p>
                            
                            
                        </div>
                    ))}
                </div>
            ) : (<p className="text-sm text-gray-500">No Comments</p>)}


            {/* Auth users can only see this and post comments */}
            {isAuthenticated ? (
                <div className="mt-4 space-y-2 ">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full border border-gray-400 outline-none rounded p-2 text-sm"
                        placeholder="Write a comment..."
                        rows={3}
                    />
                    <div className="flex items-center justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-black text-white px-4 py-1 rounded cursor-pointer hover:bg-gray-800"
                        >
                            {loading ? "Posting.." : "Comment"}
                        </button>
                    </div>
                </div>
            ):(<p className="text-sm text-gray-500 mt-4 italic text-center">Sign in to write a comment</p>)}
        </div>
    )
}




export default CommentSection