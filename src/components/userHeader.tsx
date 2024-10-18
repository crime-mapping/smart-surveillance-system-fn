import profilePicture from '../assets/new-profile.jpg'
import NotificationsIcon from '@mui/icons-material/Notifications';

const UserHeader = () => {
    return (
        <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search"
          className="border rounded-md px-4 py-2 w-1/2"
        />
        <div className="flex items-center space-x-2">
        <button className="relative w-[20px] bg-inherit m-0 p-0 ">
          <NotificationsIcon className="text-yellow-500 text-4xl" />
          <span className="absolute top-0 left-4 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex flex-col items-center">
          <img
            src={profilePicture}
            alt="User"
            className="rounded-full w-10 h-10"
          />
          <span className="ml-2">Nyanja Cyane</span>
        </div>
      </div>
      </div>
    )
}

export default UserHeader;