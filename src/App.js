import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserContext from "./main/contexts/UserContext";
import Axios from "axios";
//Components
import "materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize.js";
import NavBar from "./main/components/NavBar/NavBar";
import Login from "./main/components/auth/Login";
import Register from "./main/components/auth/Register";
import url from "./main/serverUrl";
import NewPost from "./main/components/Posts/New/NewPost";
import AllPosts from "./main/components/Posts/All/AllPosts";
import Post from "./main/components/Posts/All/Post";
import Profile from "./main/components/Profile/Profile";
import LoadContext from "./main/contexts/LoadContext";
import Settings from "./main/components/Profile/Settings";

function App() {
  const [userData, setuserData] = useState({
    user: undefined,
    token: undefined,
  });

  
  const [load, setLoad] = useState(0)

  useEffect(() => {
    const CheckLoginIn = async () => {
      let token = localStorage.getItem("USER_TOKEN");
      if (token === null) {
        localStorage.setItem("USER_TOKEN", "");
        token = "";
      }
      const CheckedToken = await Axios.post(`${url}/auth/checkToken`, null, {
        headers: { "SHAHAL-USER_TOKEN": token },
      });
      if (CheckedToken.data === true) {
        const user_data = await Axios.get(`${url}/auth/user`, {
          headers: { "SHAHAL-USER_TOKEN": token },
        });

        setuserData({
          token,
          user: {
            name: user_data.data.user.name,
            username: user_data.data.user.username,
            followers: user_data.data.user.followers,
            _id: user_data.data.user._id,
            date: user_data.data.user.date,
            image: user_data.data.user.image,
          },
        });
      } else {
        setuserData({
          user: false,
          token: false,
        });
        localStorage.setItem("USER_TOKEN", "");
      }
    };
    CheckLoginIn();
  }, []);

  if (userData.user || userData.user === false) {
    return (
      <div>
        <Router>
          <LoadContext.Provider value={{setLoad,load}}>
            <UserContext.Provider value={{ userData, setuserData }}>
              <NavBar />
              <div className="container">
                <br />
                <Switch>
                  <Route path="/" exact component={AllPosts} />
                  <Route path="/login" component={Login} />
                  <Route path="/post/:id" component={Post} />
                  <Route path="/register" component={Register} />
                  <Route path="/new" component={NewPost} />
                  <Route path="/profile/:id" component={Profile} />
                  <Route path="/settings" component={Settings} />
                <Route path='/myprofile' component={Profile} />
                </Switch>
              </div>
              <br />
              <br />
            </UserContext.Provider>
          </LoadContext.Provider>
        </Router>
      </div>
    );
  } else{
    return (
      <div >
      <div className="hide-on-med-and-down preloader-wrapper big active" style={{ left: "55.6rem", top: '19.3rem' }}>

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
      <div className="hide-on-large-only hide-on-small-only  preloader-wrapper big active" style={{ left: "29rem", top: '19.5rem' }}>

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
      <div className="hide-on-med-and-up preloader-wrapper big active" style={{ left: "10.3rem", top: "19rem" }}>

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

export default App;
