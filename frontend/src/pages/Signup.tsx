import {motion} from "framer-motion"
import AuthForm from "../components/AuthForm"

const Signup = () => {

  const handleSignUp = (data:{email:string,password:string})=>{
    console.log("Sign In Successfull",data)
  }

  return (
    
        <motion.div 
        initial={{ opacity: 0, y: 50 }} // Start faded and slightly below
        animate={{ opacity: 1, y: 0 }}   // Animate to full opacity and original position
        transition={{ duration: 0.6, ease: "easeOut" }}
       >
        <section className="min-h-[78vh] place-items-center grid">
          <AuthForm type="signup" heading="Join Blogr." onSubmit={handleSignUp} />
        </section>
          
        </motion.div>
  
  )
}

export default Signup