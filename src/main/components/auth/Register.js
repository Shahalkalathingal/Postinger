import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import url from "../../serverUrl";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import LoadContext from "../../contexts/LoadContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [con_password, setConfirm_password] = useState("");

  const { setuserData, userData } = useContext(UserContext);
  const { setLoad } = useContext(LoadContext);
  const history = useHistory();

  const SubmitHandle = async (e) => {
    try {
      e.preventDefault();
      const response = await Axios.post(`${url}/auth/register`, {
        email,
        password,
        name,
        username,
        con_password,
      });
      setuserData({
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("USER_TOKEN", response.data.token);
      M.toast({ html: "Your account was created", classes: "green" });
      M.toast({
        html: `Shahal, Thank you ${name} for joining to us`,
        classes: "green",
      });
      history.push("/");
    } catch (err) {
      if(err && err.response && err.response.data && err.response.data.msg){

        return M.toast({ html: err.response.data.msg, classes: "red" });
      }
    }
  };

  useEffect(() => {
    if (userData.user) {
      history.push("/");
    }
  }, []);
  setLoad(100);
  return (
    <div >
      <blockquote>
        <p>Create new account</p>
      </blockquote>
      <form>
        <div className="input-field col s12 l6">
          <input
            type="text"
            id="Name"
            value={name}
            className="validate"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="Name">Full Name</label>
        </div>
        <div className="input-field col s12 l6">
          <input
            type="text"
            id="username"
            value={username}
            className="validate"
            maxLength="19"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">username</label>
        </div>
        <div className="input-field col s12">
          <input
            type="email"
            id="email"
            className="validate"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="email" data-error="wrong" data-success="right">
            Email
          </label>
        </div>
        <div className="input-field col s12">
          <input
            type="password"
            id="Password"
            className="validate"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="Password" data-error="wrong" data-success="right">
            Password
          </label>
        </div>
        <div className="input-field col s12">
          <input
            type="password"
            id="con_password"
            value={con_password}
            className="validate"
            onChange={(e) => setConfirm_password(e.target.value)}
          />
          <label htmlFor="con_password" data-error="wrong" data-success="right">
            Confirm Password
          </label>
        </div>
        <button
          className="btn blue"
          onClick={SubmitHandle}
          name="action"
        >
          Create Account
        </button>
        <br />
        <br />
        Already have an account ? <Link to="/login">Login</Link>
      </form>
    </div>
  );
}

export default Register;
