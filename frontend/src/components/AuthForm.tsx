import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

// 1. Zod schema
const AuthSchema = z.object({
  name:z.string().min(3,"Name must be atleast 3 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Infer TS type from Zod schema
type AuthFormData = z.infer<typeof AuthSchema>;

// 3. Add types to props
interface AuthFormProps {
  type?: "signin" | "signup";
  heading?: string;
  onSubmit: (data: AuthFormData) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type = "signin",
  heading = "Please sign in to continue",
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
  });

  return (
    
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md sm:p-6 p-4 flex flex-col items-center gap-6 rounded-md bg-white "
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center">{heading}</h2>

        <div className="grid gap-2 w-full">
        { type === "signup" && <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border outline-none"
          />}
          { type === "signup" && errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border outline-none"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border outline-none"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="bg-black text-white w-full p-2 rounded-md cursor-pointer hover:opacity-80"
          >
            {type === "signup" ? "Create Account" : "Login"}
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
