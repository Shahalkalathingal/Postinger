import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Follow from "../Posts/Follow/Follow";
import UserContext from "../../contexts/UserContext";
import Followings from "../Posts/Follow/Followings";
import axios from "axios";
import url from "../../serverUrl";
import M from 'materialize-css'

function Details({ user, postLength }) {
  const { userData } = useContext(UserContext);
  const [ViewFollowings, setViewFollowings] = useState(false);
  const [ViewFollowers, setViewFollowers] = useState(true);
  const [followersNum, setFollowersNum] = useState(0);
  const [followers, setFollowers] = useState(false);

  const getFollowers = async () => {
    if(userData.user._id !== user._id && user.privacy === 1){
      return M.toast({html:"This is a private account"})
    }
  try {
    setViewFollowings(false);
    setViewFollowers(true);

    const Followers = await axios.post(`${url}/follow/count`, {
      userTo: user._id,
    });
    setFollowersNum(Followers.data.followers.length);
    setFollowers(Followers.data.followers);
  } catch (error) {
    throw error;
  
}
  };

  return (
    <div>
      {userData.user._id !== user._id && (
        <div className="right">
          <Follow post userTo={user._id} userFrom={userData.user._id} />
        </div>
      )}
      {/**On Small */}
      <img
        src={user.image}
        style={{ width: "40rem", height: "21rem" }}
        alt="avatar"
        className="hide-on-med-and-up circle responsive-img"
      />
      {/**On meduime */}
      <div className="row">
        <div className="col s12 m4 l4">
          <br className="hide-on-large-only hide-on-small-only" />
          <br className="hide-on-large-only " />
          <img
            src={user.image}
            alt="avatar"
            style={{ width: "40rem", height: "17rem" }}
            className="hide-on-large-only hide-on-small-only circle responsive-img"
          />
          {/**On large */}
          <br className=" hide-on-small-only" />
          <br className=" hide-on-small-only" />
          <img
            src={user.image}
            alt="avatar"
            style={{ width: "18rem", height: "17rem"}}
            className="hide-on-med-only hide-on-small-only circle responsive-img"
          />
        </div>
        <div className="col s12 m7 l8">
          <br className="hide-on-large-only hide-on-small-only" />
          <br className="hide-on-large-only hide-on-small-only" />
          <br className="hide-on-med-and-down" />
          <ul className="collection with-header">
            <li className="collection-header">
              <h4>
                <strong>Name: </strong>
                {user.name}
              </h4>
            </li>
            <li className="collection-item">
              <div>
                <strong>Username: </strong> {user.username}
              </div>
            </li>
            <li className="collection-item">
              <div>{postLength} Posts</div>
            </li>

            <li className="collection-item">
              <div>
                <Follow
                  userTo={user._id}
                  userFrom={userData.user._id}
                  showInProfile
                />
                <Link
                  to="#"
                  className="secondary-content"
                  onClick={getFollowers}
                >
                  View
                </Link>
              </div>
            </li>

            <li className="collection-item">
              <div>
                <Followings profile userId={user._id} />
                <Link
                  id="getFollowers"
                  onClick={() => {
                    if(userData.user._id !== user._id && user.privacy === 1){
                      return M.toast({html:"This is a private account"})
                    }

                      setViewFollowers(false);
                      setViewFollowings(true);
                    
                  }}
                  to="#"
                  className="secondary-content"
                >
                  View
                </Link>
              </div>
            </li>
            {user.bio && (
              <li className="collection-item">
                <div>
                  <strong>Bio: </strong> {user.bio}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
     {user.privacy === 0 || user._id === userData.user._id ?
    <>
 {ViewFollowings && <Followings profile view userId={user._id} />}
      {ViewFollowers && (
        <div>
          <>
            <blockquote>
              <p>{followersNum} Followers</p>
            </blockquote>
            <table className="centered">
              <thead>
                <tr>
                  <th data-field="id">Username</th>
                  <th data-field="name">Options</th>
                </tr>
              </thead>
              <tbody>
                {followers &&
                  followers.map((follower) => (
                    <tr>
                      <td>
                        <a
                          className="a1"
                          href={`/profile/${follower.userFrom._id}`}
                        >
                          {follower.userFrom.username}
                        </a>
                      </td>
                      <td>
                        <Follow
                        profile
                          userTo={follower.userFrom._id}
                          userFrom={userData.user._id}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        </div>
      )}
    </> 
    :
    <>
    <blockquote>
      <p>This is private account</p>
    </blockquote>
    </>
    }
    
</div>


   
  );
}

export default Details;
