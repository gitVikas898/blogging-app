
import SignIn from "./AuthForm"
import { SignInModalProps } from "../utils/types"
import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";


const SignInModal = ({ onClose }: SignInModalProps) => {
   
    const modalRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    // The generic type <HTMLDivElement> tells TypeScript that this ref will point to a div element.
    //Initially, it's set to null because the component hasn’t rendered yet.
    const handleSignIn = async (data:{email:string,password:string})=>{
        const res = await fetch("http://localhost:8000/api/auth/login",{
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify(data)
    
        })
  
        const result = await res.json();
  
        if(res.ok){
        useAuthStore.getState().login(result.token, result.user);
          navigate("/dashboard");
        }else{
          alert(result.message || "Invalid Credentials")
        }
    }
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        }
    }, [onClose])

    return (
        <AnimatePresence>
            <>
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                <motion.div
                    ref={modalRef}
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl z-50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    <SignIn type="signin" onSubmit={handleSignIn}/>
                </motion.div>

            </>

        </AnimatePresence>
    )
}

export default SignInModal