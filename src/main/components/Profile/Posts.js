import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Like from "../Posts/All/Like";
import Follow from "../Posts/Follow/Follow";

function Posts({ posts, user }) {
  const { userData } = useContext(UserContext);




  if(posts.length < 1){
    return (
      <React.Fragment>
      <div className="center" style={{ marginTop: "5rem" }}>
        {userData.user._id === user._id ?
        <>
        <h5>Nothing was uploaded</h5>
        <Link to="/new" className="btn">Upload</Link>
        </>
        :
        <h5>Nothing was uploaded</h5>
      }
      </div>
    </React.Fragment>
     )
  }else{

    return (
      <div>
        {userData.user._id !== user._id && (
          <>
            <div className="right">
              <Follow post userTo={user._id} userFrom={userData.user._id} />
            </div>
            <br />
            <br />
            <br />
          </>
        )}
  
        <div className="row">
          {posts.map((post) => (
            <div className="col s12 m4 l4">
              <div className="card">
                <div className="card-image">
                  <img src={post.file} className="img-responsive" />
                </div>
                <div className="card-action">
                  <Link to={`/post/${post._id}`}>View post</Link>
                  <div className="right">
                    <Like post postId={post._id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Posts;
