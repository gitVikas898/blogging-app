import { BiCalendar, BiUser } from "react-icons/bi";
import { useAuthStore } from "../store/useAuthStore";
import { UserCardProps } from "../utils/types";
import { IoIosMail, IoMdColorWand } from "react-icons/io";
import { RiFolderInfoLine } from "react-icons/ri"
import { useState } from "react";
const UserCard = ({
    username,
    id,
    email,
    intrests,
    followersCount,
    memberSince,
    bio,
    blogs,
}: UserCardProps) => {
    const userId = useAuthStore((state) => state.user?.id);
    const [editBio, setEditBio] = useState(false);
    const[focus,setFocus] = useState(false);
    const[userBio,setUserBio] = useState<string>(bio); 

    return (
        <div className="p-6 flex flex-col items-center bg-white rounded-xl  text-center gap-4">

            {/* Avatar */}
            <div className="w-24 h-24">
                <img
                    src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logoutImg.svg"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border-2 border-gray-300"
                />
            </div>

            {/* User Info */}
            <div className="w-full flex items-center flex-col gap-2">
                <h2 className="text-2xl font-semibold text-gray-800">{username}</h2>
                {id !== userId && <button className="bg-lime-500 px-4 py-2 rounded-md text-white">Follow</button>}
                <p className="flex items-center gap-1"><BiUser /> Followers: <span className="font-medium">{followersCount}</span></p>
                <p className="text-sm text-gray-500  flex items-center gap-1"><IoIosMail /> {email}</p>
                <p className="text-sm text-gray-500  flex items-center gap-1"><BiCalendar /> Joined: {new Date(memberSince).toDateString()}</p>
                <p className="text-sm text-gray-500  flex items-center gap-1"><IoMdColorWand /> Interests:{intrests.map((i) => i.title).join(", ")}</p>
                {editBio ? (
                    <div className=" flex mt-4 gap-2 items-center">
                        <input
                         placeholder="enter new bio"
                          className={`flex-1 py-2 px-2 bg-gray-50 rounded-lg outline-none transition-all delay-300 ease-in ${focus ? "border-blue-600 border-solid border-2":"border-gray-300 border-1"}`}
                          onFocus={()=>setFocus(true)}
                          onBlur={()=>setFocus(false)}
                          >
                        </input>
                        <button className="bg-blue-600 px-4 py-2 rounded-lg text-white">Save</button>
                    </div>
                    ) :
                    (<>
                        <p className="text-sm text-gray-500  flex items-center gap-2 justify-between">
                            <RiFolderInfoLine /> Bio: {bio.length > 0 ? bio[0].content : "No bio yet."}
                        </p>
                       
                    </>)}
                    {
                    <span className="text-green-500 underline font-semibold cursor-pointer" onClick={() => setEditBio(!editBio)}>
                         edit
                     </span>
                    }

                <div className="mt-3 text-sm text-gray-700 italic">
                    <p className="mt-4 text-sm text-blue-600 font-semibold">
                        📚 Recent Blogs
                    </p>
                    {blogs.map((blog) => (
                        <div className="grid gap-2">
                            <p>{blog.title}</p>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default UserCard;
