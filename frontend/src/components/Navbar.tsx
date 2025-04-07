import { BiArrowToRight, BiBook } from "react-icons/bi"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex py-5 border-b-1 border-black border-solid  container mx-auto items-center justify-around">
        <div id="logo-ct">
            <h1 className="text-4xl font-semibold"><Link to={"/"}>Blogr</Link></h1>
        </div>
        <div className="">
            <ul className="flex items-center justify-between gap-10">
                <li><Link to={"/blogs"} className="flex items-center gap-1"><BiBook/> Read</Link></li>
                <li><Link to={"/login"}>Sign in</Link></li>
                <li className="block py-2 px-4 bg-black text-white rounded-full"><Link to={"/signup"} className="flex items-center gap-1">Get Started <BiArrowToRight/></Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar