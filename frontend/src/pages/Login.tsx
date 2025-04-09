
import { motion } from "framer-motion"
import SignIn from "../components/AuthForm"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom";
const Login = () => {

  const navigate = useNavigate();
 const handleSignIn = async (data:{email:string,password:string})=>{
      const res = await fetch("http://localhost:8000/api/auth/login",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(data)
  
      })

      const result = await res.json();

      if (res.ok) {
        useAuthStore.getState().login(result.token, result.user);
        navigate("/dashboard")
      }else{
        alert(result.message || "Invalid Credentials")
      }
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
