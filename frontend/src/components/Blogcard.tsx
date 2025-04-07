// BlogCard.tsx
import React from "react";
import { BlogCardProps } from "../utils/types";
import { Link } from "react-router-dom";

const BlogCard: React.FC<BlogCardProps> = ({
    id,
    title,
    content,
    author,
    createdAt,
    BlogTags,
    _count,
    // optional click handler if needed
}) => {
    return (
        <Link to={`/blogs/${id}`}>
            <div
                className="bg-white mb-2 rounded-2xl  p-6 hover:shadow-lg transition-all cursor-pointer"

            >
                <h2 className="text-xl font-bold mb-2">{title}</h2>

                <p className="text-gray-600 text-sm mb-4">
                    By {author.username} • {new Date(createdAt).toLocaleDateString()}
                </p>

                <p className="text-gray-800 mb-3">{content.slice(0, 150)}...</p>

                {BlogTags?.length > 0 && (
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

                <p className="text-sm text-gray-500 mt-3">❤️ {_count?.Like ?? 0} Likes</p>
            </div>
        </Link>

    );
};

export default BlogCard;
