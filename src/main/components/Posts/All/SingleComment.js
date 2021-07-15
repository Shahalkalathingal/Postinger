import React, { useContext } from "react";
import moment from "moment";
import Like from "./Like";
import UserContext from "../../../contexts/UserContext";
import axios from "axios";
import url from "../../../serverUrl";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

function SingleComment({ comment, postId }) {
  const { userData } = useContext(UserContext);

  const history = useHistory();

  const RemoveMyComment = async () => {
    const deleteComment = await axios.post(
      `${url}/post/deleteComment`,
      { commentId: comment._id },
      {
        headers: { "SHAHAL-USER_TOKEN": localStorage.getItem("USER_TOKEN") },
      },
    );
    M.toast({ html: "Comment deleted", classes: "green" });

    history.push("/");
  };
  return (

      <li className="collection-item avatar">
        <img
          src={comment.writer.image}
          alt="avatar"
          className="circle"
        />
        <span className="title"><strong>{comment.writer.username}</strong></span>
        <br />
        <br />
        
        <span>
          {comment.content}
        </span>
        <br/>
        <br/>
        <strong>{moment(comment.createdAt).fromNow()}</strong>
        <Link to="#" className="secondary-content">
        <Like comment commentId={comment._id} />
        </Link>
       
        {userData.user && userData.user._id === comment.writer._id && (
            <i  style={{ color: "red", cursor: 'pointer' }} className="material-icons right" onClick={RemoveMyComment}>delete</i>
           )}
      </li>
  );
}

export default SingleComment;
