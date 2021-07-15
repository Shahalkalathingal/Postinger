import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import url from "../../serverUrl";
import M from "materialize-css";
import LoadContext from "../../contexts/LoadContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const { setLoad } = useContext(LoadContext);

  const { setuserData, userData } = useContext(UserContext);
  const SubmitHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });
      setuserData({
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("USER_TOKEN", response.data.token);

      M.toast({ html: `You are now logged in`, classes: "green" });
      M.toast({
        html: `Shahal, Hai ${response.data.user.name}`,
        classes: "green",
      });

      history.push("/");
    } catch (err) {
      M.toast({ html: err.response.data.msg, classes: "red" });
    }
  };
  useEffect(() => {
    if (userData.user) {
      history.push("/");
    }
  }, []);
  setLoad(100);
  return (
    <div>
      <blockquote>
        <p>Login</p>
      </blockquote>
      <div>
        <form>
          <div className="input-field col s12">
            <input
              type="text"
              id="email"
              className="validate"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="email" data-error="wrong" data-success="right">
              Username or Email
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
          <button
            className="btn blue"
            onClick={SubmitHandle}
            name="action"
          >
            Login
          </button>
          <br />
          <br />
          Don't have an account ? <Link to="/register">Create account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
