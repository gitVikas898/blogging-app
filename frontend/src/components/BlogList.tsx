import { useEffect, useState } from "react";
import BlogCard from "./Blogcard";
import { BlogCardProps } from "../utils/types";
import Spinner from "./Spinner";
import { motion } from 'framer-motion';

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
        <motion.div
        initial={{ opacity: 0, y: 50 }} // Start faded and slightly below
        animate={{ opacity: 1, y: 0 }}   // Animate to full opacity and original position
        transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {blogs?.map((blog)=>(
                <BlogCard key={blog.id}
                id={blog.id}
                 title={blog.title} content={blog.content} 
                 author={blog.author} _count={blog._count} 
                 BlogTags={blog.BlogTags} createdAt={blog.createdAt}
                 updatedAt={blog.updatedAt} comments={blog.comments}
                 />
            ))}
        </motion.div>
    )
}

export default BlogList;