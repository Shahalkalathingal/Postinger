import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import url from "../../../serverUrl";
import Comments from "./Comments";
import Like from "./Like";
import M from "materialize-css";
import UserContext from "../../../contexts/UserContext";
import moment from "moment";
import Follow from "../Follow/Follow";
import LoadContext from "../../../contexts/LoadContext";

function Post() {
  const [post, setpost] = useState(false);
  const [CommentLists, setCommentLists] = useState([]);
  const history = useHistory();

  const params = useParams();
  const id = params.id;
  const { userData } = useContext(UserContext);
  const { setLoad } = useContext(LoadContext);
  useEffect(() => {
    const getOnePost = async () => {
      try {
        const Post = await axios.get(`${url}/post/getOne/${id}`);
        setpost(Post.data.post);
      } catch (error) {
        setpost(null);
      }
    };
    const getAllComments = async () => {
      try {
        const Comments = await axios.get(`${url}/post/getComments/${id}`);
        setCommentLists(Comments.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    getAllComments();
    getOnePost();
  }, [id]);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  const deletePost = async () => {
    if (post.user._id === userData.user._id) {
      await axios.post(
        `${url}/post/deletePost`,
        { _id: post._id, userId: userData.user._id },
        {
          headers: { "SHAHAL-USER_TOKEN": localStorage.getItem("USER_TOKEN") },
        },
      );
      M.toast({ html: "Post deleted successfully", classes: "green" });
      history.push("/");
    } else {
      M.toast({ html: "You can only delete your post", classes: "red" });
    }
  };

  if (post === null) {
    setLoad(100);
    return (
      <React.Fragment>
        <div className="center" style={{ marginTop: "5rem" }}>
          <h5>Post not found</h5>
          <br />
          <Link to="/" className="btn">
            Go to Home
          </Link>
        </div>
      </React.Fragment>
    );
  } else {
    if (post) {
      setLoad(100);
      return (
        <div>
          {post.user.privacy === 0 || post.user._id === userData.user._id && post.deleted ===  false?
          <>
          <div className="card home-card center">
          <Link to={`/profile/${post.user._id}`}>
            <img className="imghome circle" src={post.user.image} alt="" />
            <h4 className="a">{post.user.username}</h4>
          </Link>
          <div className="card-image">
            <img src={post.file} alt="Postimg" style={{ minHeight: '13rem', maxHeight: '46rem' }}/>
            <span className="right">
              <strong style={{marginLeft:'-8rem'}}>{moment(post.createdAt).fromNow()}</strong>
            </span>
            <Like post postId={post._id} />
          </div>
          <div className="card-content">
            {userData.user._id === post.user._id && (
              <i
                className="material-icons right"
                style={{ color: "red", cursor: "pointer" }}
                onClick={deletePost}
              >
                delete
              </i>
            )}
            <div className="center">
              <span>{post.body}</span>
            </div>
          </div>
        </div>
        {userData.user && userData.user._id === post.user._id && <></>}

        {userData.user._id !== post.user._id && post.user.isAdmin === false && (
          <Follow post userTo={post.user._id} userFrom={userData.user._id} />
        )}

        <div class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div class="modal-footer">
            <a
              href="#!"
              class="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>

        <Comments
          postId={post._id}
          refreshFunction={updateComment}
          CommentLists={CommentLists}
        />
        </>
        :
        <React.Fragment>
        <div className="center" style={{ marginTop: "5rem" }}>
          <h5>This post is private</h5>
          <br />
          <Link to="/" className="btn">
            Go to Home
          </Link>
        </div>
      </React.Fragment>
        }
          
        </div>
      );
    } else {
      setLoad(29);
      return (
        <div >
                <div className="hide-on-med-and-down preloader-wrapper big active" style={{ left: "40rem", top: '14rem' }}>

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
                <div className="hide-on-large-only hide-on-small-only  preloader-wrapper big active" style={{ left: "26.3rem", top: '14rem' }}>

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

export default Post;
