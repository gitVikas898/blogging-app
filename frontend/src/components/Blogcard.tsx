import React from "react";
import { BlogCardProps } from "../utils/types";
import { Link } from "react-router-dom";
import { BiComment, BiHeart } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

const BlogCard: React.FC<BlogCardProps> = ({
    id,
    title,
    content,
    author,
    createdAt,
    BlogTags,
    _count,
    comments,
    readingTime
    
}) => {
   
    const truncatedContent = content.length > 150 
        ? content.slice(0, 150) + '...' 
        : content;
        
    return (
        <Link to={`/blogs/${id}`}>
            <div
                className="w-full bg-white mb-2 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
            >
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                
                <p className="text-gray-600 text-sm mb-4">
                    By {author.username} • {new Date(createdAt).toLocaleDateString()}
                </p>
                
                <div 
                    className="text-gray-800 mb-3" 
                    dangerouslySetInnerHTML={{__html: truncatedContent}}
                />
                
                {BlogTags && BlogTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {BlogTags.map((tagObj, idx) => (
                            <span
                                key={idx}
                                className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                            >
                                #{tagObj.tag.name}
                            </span>
                        ))}
                    </div>
                )}
                
                <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 mt-3 flex gap-2 items-center">
                        <BiHeart /> {_count?.Like ?? 0} Likes
                    </p>
                    <p className="text-sm text-gray-500 mt-3 flex gap-2 items-center">
                        <BiComment /> {comments?.length || 0} Comments
                    </p>
                    <p className="text-sm text-gray-500 mt-3 flex gap-2 items-center">
                        <BsClock />{readingTime ?? 1} min
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;