import React, { useContext, useState } from "react";
import Dropzone from "react-dropzone";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import url from "../../serverUrl";
import UserContext from "../../contexts/UserContext";
function Edit({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  //   const [con_password, setConfirm_password] = useState("");
  //   const [password, setPassword] = useState("");
  const { setuserData,userData } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [PreviewFile, setPreviewFile] = useState(user.image);

  const history = useHistory();
  const onDrop = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!PreviewFile) {
      {
        return;
      }
    }
    update(PreviewFile);
  };

  const update = async (image) => {
    try {
      let reqBody = {
        image,
        name,
        username,
        bio,
        email,
        _id: user._id,
      };
      const token = localStorage.getItem("USER_TOKEN");
      const response = await axios.post(`${url}/user/update`, reqBody, {
        headers: { "SHAHAL-USER_TOKEN": token },
      });
      setuserData({
      token:userData.token,
      user:response.data.user
    })
    M.toast({ html: "Profile changes saved", classes: "green" });

      history.push("/");
    } catch (err) {
    console.log(err);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewFile(reader.result);
    };
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <blockquote>
        <p>Edit</p>
      </blockquote>
      <form onSubmit={onSubmit}>
        <div className="input-field col s12 l6">
          <input
            type="text"
            id="Name"
            value={name}
            className="validate"
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </div>
        <div className="input-field col s12 l6">
          <input
            type="text"
            id="username"
            value={username}
            className="validate"
            onChange={(e) => setUsername(e.target.value)}
            maxLength="19"
            placeholder="Username"
          />
        </div>
        <div className="input-field col s12">
          <input
            type="email"
            id="email"
            className="validate"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <blockquote>
          <p>Bio</p>
        </blockquote>
        <div className="input-field col s12">
          <input
            type="text"
            id="bio"
            className="validate"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Bio"
          />
        </div>
        <blockquote>
          <p>Image</p>
        </blockquote>

        <div className="input-field col s12 l6">
          <Dropzone multiple={false} maxSize={80000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                  cursor: "pointer",
                }}
                {...getRootProps()}
              >
                <input
                  {...getInputProps()}
                  accept="image/*"
                  onChange={onDrop}
                />

                <i style={{ fontSize: "40px" }} className="material-icons">
                  add_a_photo
                </i>
              </div>
            )}
          </Dropzone>
        </div>

        {PreviewFile && (
          <div className="card-image">
            <img
              src={PreviewFile}
              className="circle"
              style={{ height: "19rem", width: "19rem" }}
              alt="choosen"
            />
          </div>
        )}

        <button
          onClick={onSubmit}
          className="btn waves-effect waves-light"
          name="action"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Edit;
