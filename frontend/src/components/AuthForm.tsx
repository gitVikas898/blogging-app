import { useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useEffect } from "react";

// 1. Zod schema
const SignUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Infer TS type from Zod schema
type SignUpData = z.infer<typeof SignUpSchema>;
type LoginData = z.infer<typeof LoginSchema>;

// 3. Add types to props
interface AuthFormProps {
  type?: "signin" | "signup";
  heading?: string;
  onSubmit: (data: SignUpData | LoginData) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type = "signin",
  heading = "Please sign in to continue",
  onSubmit,
}) => {
  const isSignUp = type === "signup";
  
  // Sign Up Form
  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema)
  });
  
  // Login Form
  const loginForm = useForm<LoginData>({
    resolver: zodResolver(LoginSchema)
  });
  
  // Reset forms when type changes
  useEffect(() => {
    if (isSignUp) {
      loginForm.reset();
    } else {
      signUpForm.reset();
    }
  }, [type, loginForm, signUpForm,isSignUp]);

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      signUpForm.handleSubmit((data) => onSubmit(data))();
    } else {
      loginForm.handleSubmit((data) => onSubmit(data))();
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full max-w-md sm:p-6 p-4 flex flex-col items-center gap-6 rounded-md bg-white"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-center">{heading}</h2>

      <div className="grid gap-2 w-full">
        {isSignUp && (
          <>
            <input
              {...signUpForm.register("name")}
              type="text"
              placeholder="Name"
              className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border outline-none"
            />
            {signUpForm.formState.errors.name && (
              <p className="text-sm text-red-500">{signUpForm.formState.errors.name.message}</p>
            )}
          </>
        )}
        
        {isSignUp ? (
          <>
            <input
              {...signUpForm.register("email")}
              type="email"
              placeholder="Email"
              className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border outline-none"
            />
            {signUpForm.formState.errors.email && (
              <p className="text-sm text-red-500">{signUpForm.formState.errors.email.message}</p>
            )}

            <input
              {...signUpForm.register("password")}
              type="password"
              placeholder="Password"
              className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border outline-none"
            />
            {signUpForm.formState.errors.password && (
              <p className="text-sm text-red-500">{signUpForm.formState.errors.password.message}</p>
            )}
          </>
        ) : (
          <>
            <input
              {...loginForm.register("email")}
              type="email"
              placeholder="Email" 
              className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border outline-none"
            />
            {loginForm.formState.errors.email && (
              <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
            )}

            <input
              {...loginForm.register("password")}
              type="password"
              placeholder="Password"
              className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border outline-none" 
            />
            {loginForm.formState.errors.password && (
              <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
            )}
          </>
        )}
      </div>

      <div className="w-full">
        <button
          type="submit"
          className="bg-black text-white w-full p-2 rounded-md cursor-pointer hover:opacity-80"
        >
          {isSignUp ? "Create Account" : "Login"}
        </button>
      </div>

      <p className="text-sm text-center">
        {type === "signin" ? (
          <>
            No account?{" "}
            <Link className="text-lime-500 font-semibold" to="/signup">
              Create one
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link className="text-lime-500 font-semibold" to="/login">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default AuthForm;