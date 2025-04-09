
import { motion } from "framer-motion"
import SignIn from "../components/AuthForm"
const Login = () => {

  const handleSignIn = (data:{email:string,password:string})=>{
    console.log("Sign In Successfull",data)
  }

  return (
    
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start faded and slightly below
        animate={{ opacity: 1, y: 0 }}   // Animate to full opacity and original position
        transition={{ duration: 0.6, ease: "easeOut" }}
       
      >
        <section className="grid place-items-center min-h-[78vh] w-full">
          <SignIn type="signin" heading="Welcome Back" onSubmit={handleSignIn}></SignIn>
        </section>
      </motion.div>
  
  )
}

export default Login
