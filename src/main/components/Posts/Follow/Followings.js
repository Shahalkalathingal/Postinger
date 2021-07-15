import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import url from "../../../serverUrl";
import Follow from "./Follow";

function Followings({ view, userId, profile }) {
  const [followingsNum, setFollowingsNum] = useState(false);
  const [followings, setFollowings] = useState(false);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const getFollowings = async () => {
      try {
        const Followings = await axios.post(`${url}/follow/getFollowings`, {
          userId,
        });
        if (Followings.data.success) {
          setFollowingsNum(Followings.data.followings.length);
          setFollowings(Followings.data.followings);
        }
      } catch (error) {
        alert("Something went wrong...");
      }
    };
    getFollowings();
  }, []);

  if (view) {
    return (
      <React.Fragment>
        {followingsNum && followings || followings !== false ? (
          // If we get followings data
          <div>
            <blockquote>
              <p>{followingsNum} Followings</p>
            </blockquote>
    
              <table className="centered">
                <thead>
                  <tr>
                    <th data-field="id">Username</th>
                    <th data-field="name">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {followings && followings.map((following) => (
                    <tr>
                      <td>
                        <a className="a1" href={`/profile/${following.userTo._id}`}>
                          {following.userTo.username}
                        </a>
                      </td>
                      <td>
                        <Follow
                        profile
                          userTo={following.userTo._id}
                          userFrom={userData.user._id}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
          </div>
        ) : (
          //else
          <div>
            <div
              className="hide-on-med-and-down preloader-wrapper big active"
              style={{ left: "38rem" }}
            >
              <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-red">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-yellow">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-green">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>

            {/** On Meduim */}
            <div
              className="hide-on-large-only hide-on-small-only  preloader-wrapper big active"
              style={{ left: "26rem" }}
            >
              <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-red">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-yellow">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-green">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>

            {/** On Small */}
            <div
              className="hide-on-med-and-up preloader-wrapper big active"
              style={{ left: "10.5rem" }}
            >
              <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-red">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-yellow">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-green">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

  if (profile) {
    return <React.Fragment>{followingsNum} Followings</React.Fragment>;
  }
}

export default Followings;
