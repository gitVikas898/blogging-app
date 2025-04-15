import { FollowType } from "../utils/types"

const Follow = ({username,id,email,onFollow}:FollowType) => {
  return (
    <div className="flex items-center justify-center">
        <div className="flex items-center justify-between shadow-md p-4 max-w-fit gap-8">
            <img src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logoutImg.svg" alt="profile" />
            <p>{username}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Follow</button>
        </div>
    </div>
  )
}

export default Follow