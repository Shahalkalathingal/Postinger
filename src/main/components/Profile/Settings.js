import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoadContext from "../../contexts/LoadContext";
import UserContext from "../../contexts/UserContext";
import M from "materialize-css";
import axios from "axios";
import url from "../../serverUrl";

function Settings() {
  const { setLoad } = useContext(LoadContext);
  const [privacy, setPrivacy] = useState(null);
  const [viewAcc, setViewDeleteAcc] = useState(false);
  const [key, setKey] = useState(false);

  const [sure, setSure] = useState("");
  const [why, setWhy] = useState("");

  const history = useHistory();
  const { setuserData, userData } = useContext(UserContext);

  const DeleteAcc = async (e) => {
    e.preventDefault();
    if (sure === key) {
      try {
        if (!why) {
          return M.toast({ html: "Please add all fields", classes: "orange" });
        }
        const reqBody = {
          why,
        }

        await axios.post(`${url}/settings/deleteAcc`,reqBody,{
          headers: { "SHAHAL-USER_TOKEN": localStorage.getItem("USER_TOKEN") },
        })

        setuserData({
          user: false,
          token: false,
        });
    
        localStorage.setItem("USER_TOKEN", "");
        M.toast({ html: "Your account was deleted", classes: "green" });
        M.toast({ html: "Shahal, I expect you will come with another account!", classes: "orange" });
        M.toast({ html: "Shahal, Iam waiting...", classes: "green" });
        history.push("/");
        

      } catch (error) {
        alert('Something went wrong....')
      }
    } else {
      return M.toast({ html: "Wrong delete key", classes: "red" });
    }
  };

  const Private = async () => {
    await axios.post(`${url}/settings/Setprivate`, null, {
      headers: { "SHAHAL-USER_TOKEN": localStorage.getItem("USER_TOKEN") },
    });
    setPrivacy(1);
  };
  const Public = async () => {
    await axios.post(`${url}/settings/Setpublic`, null, {
      headers: { "SHAHAL-USER_TOKEN": localStorage.getItem("USER_TOKEN") },
    });
    setPrivacy(0);
  };

  const logout = () => {
    setuserData({
      user: false,
      token: false,
    });

    localStorage.setItem("USER_TOKEN", "");
    M.toast({ html: "You are now logged out", classes: "green" });
    M.toast({ html: "Shahal, See you later !", classes: "green" });
    history.push("/");
  };

  useEffect(() => {
    if (userData.user === false || userData.user === null) {
      setLoad(0);
      return history.push("/login");
    }
    const getSettings = async () => {
      try {
        const Privacy = await axios.post(`${url}/settings/privacy`, null, {
          headers: { "SHAHAL-USER_TOKEN": localStorage.getItem("USER_TOKEN") },
        });
        setPrivacy(Privacy.data.privacy);
      } catch (error) {
        alert("Something went wrong....");
      }
    };
    getSettings();
    setLoad(100);
  }, []);
  if (privacy != null) {
    return (
      <div>
        {/**Public or private */}
        <blockquote>
          <p>Privacy settings</p>
        </blockquote>
        <li className="flow-text" style={{ fontSize: "16px" }}>
          Public: Your whole profile will be public
        </li>
        <li className="flow-text" style={{ fontSize: "16px" }}>
          Private: Only you can see your posts
        </li>
        <br />
        <button onClick={Private} className="btn">
          Private
        </button>
        <button onClick={Public} className="btn" style={{ marginLeft: "1rem" }}>
          Public
        </button>
        <span
          className="flow-text"
          style={{ marginLeft: "1rem", fontSize: "16px" }}
        >
          <strong>Selected: </strong>
          {privacy === 0 ? "Public" : "Private"}
        </span>

        <br />
        <br />
        <br />
        <button className="btn" onClick={logout}>
          Logout
        </button>
        {/** Danger zone*/}
        <blockquote>
          <p>Delete account</p>
        </blockquote>
        <button
          onClick={() => {
            if (viewAcc) {
              setViewDeleteAcc(false);
            } else {
              setKey(`@@${userData.user.username}@$!del*/$`);
              setViewDeleteAcc(true);
            }
          }}
          className="btn red"
        >
          Delete account
        </button>
        <br />
        <br />
        {viewAcc && (
          <form>
            <div className="input-field col s12">
              <input
                type="text"
                id="delete"
                onChange={(e) => setWhy(e.target.value)}
                required
                minLength="16"
              />
              <label htmlFor="delete" data-error="wrong" data-success="right">
                What is the reason ?
              </label>
              <br />
            </div>

            <div className="input-field col s12">
             <p className="flow-text red-col"><strong>Note: </strong> You can't backup your account when removed</p>
            </div>

            <p className="flow-text">
              <strong>Delete key: </strong>
              {key}
            </p>
            <div className="input-field col s12">
              <input
                type="text"
                id="sure"
                onChange={(e) => setSure(e.target.value)}
                required
                minLength="16"
              />

              <label htmlFor="sure" data-error="wrong" data-success="right">
                Enter Delete key to confirm
              </label>
              <br />
            </div>

            <button onClick={DeleteAcc} className="btn red">
              Delete
            </button>
          </form>
        )}
      </div>
    );
  } else {
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

export default Settings;
