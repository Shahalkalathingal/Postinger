import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import LoadContext from "../../contexts/LoadContext";

function NavBar() {
  const { load } = useContext(LoadContext);

  const { userData } = useContext(UserContext);


  if (userData.user) {
    return (
      <div className="navbar-fixed">

        <nav

        >
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{ marginLeft: "0.5rem" }}
              className="brand-logo black-col left"
            >
              Postinger
          </Link>
            <ul id="nav-mobile" className="right">
              <li>
                <Link to="/" className=" black-col">
                  <i className="material-icons">home</i>
                </Link>
              </li>
              <li>
                <Link to="/new" className="black-col">
                  <i className="material-icons">add_a_photo</i>
                </Link>
              </li>
              <li>
                <Link to={`/myprofile`} className="black-col">
                  <i className="material-icons">account_circle</i>
                </Link>
              </li>
              <li>
                <Link to={`/settings`} className="black-col">
                  <i className="material-icons">settings</i>
                </Link>
              </li>
            </ul>

            <div className="progress indigo lighten-3">
              <div className="determinate indigo" style={{ width: `${load}%` }}></div>
            </div>

          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="navbar-fixed">

        <nav

        >
          <div className="nav-wrapper white">
            <Link
              to="/"
              className="brand-logo black-col left"
              style={{ marginLeft: "0.5rem" }}
            >
              Postinger
          </Link>
            <ul id="nav-mobile" className="right">
              <li>
                <Link to="/" className=" black-col">
                  <i className="material-icons">home</i>
                </Link>
              </li>
              <li>
                <Link to="/register" className="black-col">
                  <i className="material-icons">account_circle</i>
                </Link>
              </li>
              <li>
                <Link to="/login" className="black-col">
                  <i className="material-icons">reply_all</i>
                </Link>
              </li>
            </ul>
            <div className="progress indigo lighten-3">
              <div className="determinate indigo" style={{ width: `${load}%` }}></div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
