import { useState } from "react";
import BlogList from "../components/BlogList"
import TagSection from "../components/Tagsection"
import { motion } from 'framer-motion';



const Blogs = () => {

  const [selectedTag,setSelectedTag] = useState<string | null>(null);

  const handleClick = (tagName:string)=>{
    setSelectedTag((prev)=>(prev=== tagName ? null : tagName));
  }

  return (
    <section className="min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} // Start faded and slightly below
          animate={{ opacity: 1, y: 0 }}   // Animate to full opacity and original position
          transition={{ duration: 0.6, ease: "easeOut" }}
        className=""><TagSection selectedTag={selectedTag} onTagClick={handleClick}/></motion.div>
        <motion.div
        initial={{ opacity: 0, y: 50 }} // Start faded and slightly below
        animate={{ opacity: 1, y: 0 }}   // Animate to full opacity and original position
        transition={{ duration: 0.6, ease: "easeOut" }} 
        className="flex items-center justify-center gap-2"> <BlogList selectedTag={selectedTag}/></motion.div>
    </section>
  )
}

export default Blogs