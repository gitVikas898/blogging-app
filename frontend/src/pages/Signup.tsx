import { Link } from "react-router-dom"


const Signup = () => {
  return (
    <section className="min-h-[78vh] place-items-center grid bg-gray-50">
        <form className="shadow-lg p-8 w-[500px] flex flex-col items-center gap-8 rounded-md bg-white">
            <h1 className="text-3xl">Join Blogr.</h1>
            <div className="grid gap-2 w-[300px]" >
                <input title="name" type="text" placeholder="Name" className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border-solid border outline-none"/>
                <input title="email" type="email" placeholder="Email"className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border-solid border outline-none" />
                <input title="password" type="password" placeholder="Password" className="p-2 rounded-md w-full border-gray-400 shadow-sm bg-gray-50 border-solid border outline-none"/>
            </div>
            <div className="w-[300px]">
                <button type="submit" className="bg-black text-white w-full p-2 rounded-md cursor-pointer hover:opacity-80">Signup</button>
            </div>
            <p>Already have an account? <Link className="text-lime-500 font-bold" to={"/login"}>Signin</Link></p>
        </form>
    </section>
  )
}

export default Signup