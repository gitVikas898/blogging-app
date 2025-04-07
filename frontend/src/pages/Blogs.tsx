import BlogList from "../components/BlogList"
import TagSection from "../components/Tagsection"



const Blogs = () => {
  return (
    <section className="min-h-[80vh]">
        <div className="flex items-center justify-center"><TagSection/></div>
        <div className="flex items-center justify-center gap-2"> <BlogList/></div>
    </section>
  )
}

export default Blogs