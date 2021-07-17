import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import url from "../../serverUrl";
import Follow from "../Posts/Follow/Follow";
import M from "materialize-css";
import Edit from "./Edit";
import Details from "./Details";
import Posts from "./Posts";
import LoadContext from "../../contexts/LoadContext";

function Profile() {
  const views = {
    edit: 1,
    details: 2,
    posts: 3,
  };
  const { userData } = useContext(UserContext);
  const { setLoad } = useContext(LoadContext);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState(false);
  const [Views, setViews] = useState(2);

  const params = useParams();
  useEffect(() => {
    const getUserData = async () => {
      try {
        let User
        if(userData.user._id){
           User = await axios.get(`${url}/profile/getUser/${userData.user._id}`);
        }else{
          User = await axios.get(`${url}/profile/getUser/${params.id}`);
        }
        setUser(User.data.user);
        setPosts(User.data.posts);
      } catch (error) {
        setUser(null);
        throw error;
      }
    };

    getUserData();
  }, []);
  if ((user === null) | (posts === null)) {
    setLoad(100)
    return (
      <React.Fragment>
        <div className="center" >
          <h5>Profile not found</h5>
          <br />
          <Link to="/" className="btn">
            Go to Home
          </Link>
        </div>
      </React.Fragment>
    );
  } else {
    if (user._id && posts) {
      setLoad(100);
      return (
        <div >
          {userData.user._id === user._id 
          ? <blockquote>
          <p>My Profile</p>
        </blockquote>
        :
        <blockquote>
        <p>{user.username}</p>
      </blockquote>
          }


         
          {userData.user._id === user._id ? (
            // If the profile is mine
            <div className="collection">
              <Link
                to="#"
                onClick={() => {
                  setViews(views.details);
                }}
                className={
                  Views === 2 ? `collection-item active` : "collection-item"
                }
              >
                Profile
              </Link>

              <Link
                to="#"
                onClick={() => {
                  setViews(views.edit);
                }}
                className={
                  Views === 1 ? `collection-item active` : "collection-item"
                }
              >
                Edit
              </Link>
             
              <Link
                to="#"
                onClick={() => {
                  setViews(views.posts);
                }}
                className={
                  Views === 3 ? `collection-item active` : "collection-item"
                }
              >
                My posts
              </Link>
              
            </div>
          ) : (
            // If the profile is not mine
            <div className="collection">
              <Link
                to="#"
                onClick={() => {
                  setViews(views.details);
                }}
                className={
                  Views === 2 ? `collection-item active` : "collection-item"
                }
              >
                Profile
              </Link>
              {user.privacy === 0 && (

              <Link
                to="#"
                onClick={() => {
                  setViews(views.posts);
                }}
                className={
                  Views === 3 ? `collection-item active` : "collection-item"
                }
              >
                Posts
              </Link>
              )}
            </div>
          )}

          {Views === 1 && <Edit user={user} />}

          {Views === 2 && <Details user={user} postLength={posts.length} />}

          {Views === 3 && <Posts posts={posts} user={user} />}
        </div>
      );
    } else {
      setLoad(24);
      return (
        <div >
                <div className="hide-on-med-and-down preloader-wrapper big active" style={{ left: "38rem", top: '14rem' }}>

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
                <div className="hide-on-large-only hide-on-small-only  preloader-wrapper big active" style={{ left: "24rem", top: '14rem' }}>

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
                <div className="hide-on-med-and-up preloader-wrapper big active" style={{ left: "9.1rem", top: "14rem" }}>

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
      );
    }
  }
}

export default Profile;
