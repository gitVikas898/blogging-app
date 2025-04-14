import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore"
import Blogs from "./Blogs"
import UserCard from "../components/UserCard";
import { UserCardProps } from "../utils/types";
import SkeletonUserCard from "../components/SkeletonCard";




const Dashboard = () => {
  const userId = useAuthStore((state) => state.user?.id);
  console.log(userId)
  const id = Number(userId);
  console.log(id);

  const [userDetails, setUserDetails] = useState<UserCardProps>();


  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/auth/users/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setUserDetails(data);
        console.log(data);

      } catch (error) {
        console.error(error);
      }
    }

    getUserData();
  }, [id]);



  return (
    <section className="min-h-screen flex flex-col lg:flex-row gap-4 p-4 bg-gray-50">

      {/* Left Side - Blogs */}
      <div className="flex-1 ml-12">
        <Blogs />
      </div>

      {/* Right Side - UserCard */}
      <aside className="w-full lg:w-1/3 bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        {userDetails ? (
          <UserCard
            id={userDetails.id}
            username={userDetails.username}
            email={userDetails.email}
            followersCount={userDetails.followersCount}
            intrests={userDetails.intrests}
            memberSince={userDetails.memberSince}
            bio={userDetails.bio}
            blogs={userDetails.blogs}
          />
        ) : (
          <SkeletonUserCard />
        )}
      </aside>

    </section>
  );
}

export default Dashboard