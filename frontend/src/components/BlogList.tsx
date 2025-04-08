import { useEffect, useState } from "react";
import BlogCard from "./Blogcard";
import { BlogCardProps } from "../utils/types";
import Spinner from "./Spinner";

function BlogList(){

    const [blogs,setBlogs] = useState<BlogCardProps[]>([]);
    const [loading,setLoading] = useState(true)

    const getData = async()=>{
      try{
        const response = await fetch("http://localhost:8000/api/blogs")
        const data = await response.json();
        console.log(data);
        setBlogs(data);
          
      }catch(error){
            console.error(error);
      }finally{
        setLoading(false);
      }
    }

    useEffect(()=>{
        getData();
    },[])

    if(loading) return<Spinner/>

    return(
        <div>
            {blogs?.map((blog)=>(
                <BlogCard key={blog.id}
                id={blog.id}
                 title={blog.title} content={blog.content} 
                 author={blog.author} _count={blog._count} 
                 BlogTags={blog.BlogTags} createdAt={blog.createdAt}
                 updatedAt={blog.updatedAt} comments={blog.comments}
                 />
            ))}
        </div>
    )
}

export default BlogList;