import BlogList from "../components/BlogList"
import TagSection from "../components/Tagsection"
import { motion } from 'framer-motion';



const Blogs = () => {
  return (
    <section className="min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} // Start faded and slightly below
          animate={{ opacity: 1, y: 0 }}   // Animate to full opacity and original position
          transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-center"><TagSection/></motion.div>
        <motion.div
        initial={{ opacity: 0, y: 50 }} // Start faded and slightly below
        animate={{ opacity: 1, y: 0 }}   // Animate to full opacity and original position
        transition={{ duration: 0.6, ease: "easeOut" }} 
        className="flex items-center justify-center gap-2"> <BlogList/></motion.div>
    </section>
  )
}

export default Blogs