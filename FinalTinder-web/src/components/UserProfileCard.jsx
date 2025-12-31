import axios from "axios";
import axiosInstance from "../utils/axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axiosInstance.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl h-auto my-auto">
      <figure>
        <img src={user.photoUrl} className="rounded-lg " alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age &&<p>{age + " years " }</p>}
        {gender &&<p>{ gender}</p>}
        <div >
            <p>{about}</p></div>
        <div className="card-actions justify-center my-2">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
