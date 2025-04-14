import { BiCalendar, BiUser } from "react-icons/bi";
import { useAuthStore } from "../store/useAuthStore";
import { UserCardProps } from "../utils/types";
import { IoIosMail, IoMdColorWand } from "react-icons/io";
import { RiFolderInfoLine } from "react-icons/ri"
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
    const userId = useAuthStore((state)=>state.user?.id);

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
            <div  className="w-full flex items-center flex-col gap-2">
                <h2 className="text-2xl font-semibold text-gray-800">{username}</h2>
               { id !== userId && <button className="bg-lime-500 px-4 py-2 rounded-md text-white">Follow</button>}
                <p className="flex items-center gap-1"><BiUser/> Followers: <span className="font-medium">{followersCount}</span></p>
                <p className="text-sm text-gray-500  flex items-center gap-1"><IoIosMail/> {email}</p>
                <p className="text-sm text-gray-500  flex items-center gap-1"><BiCalendar/> Joined: {new Date(memberSince).toDateString()}</p>
                <p className="text-sm text-gray-500  flex items-center gap-1"><IoMdColorWand /> Interests:{intrests.map((i) => i.title).join(", ")}</p>
                <p className="text-sm text-gray-500  flex items-center gap-1"><RiFolderInfoLine /> Bio: {bio.length > 0 ? bio[0].content : "No bio yet."}</p>

                <div className="mt-3 text-sm text-gray-700 italic">
                    <p className="mt-4 text-sm text-blue-600 font-semibold">
                        📚 Recent Blogs
                    </p>
                    {blogs.map((blog)=>(
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
