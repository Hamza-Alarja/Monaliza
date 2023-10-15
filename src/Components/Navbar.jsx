import React from "react";
import { Link } from "react-router-dom";
export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home">
            Monaliza
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: "none" }}
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              {props.userData ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " to="home">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="movies">
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="tvshows">
                      Tv Shows
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <a href="//facebook.com/hamza.alarja" target={"_blank"}>
                  <i className="fab mx-2 fa-facebook text-primary"></i>
                </a>
                <i className="fab mx-2 fa-twitter text-info"></i>
                <i className="fab mx-2 fa-youtube text-danger"></i>
                <a
                  href="https://www.linkedin.com/in/hamzaalarja/"
                  target={"_blank"}
                >
                  <i className="fab mx-2 fa-linkedin text-primary"></i>
                </a>
              </li>
              {props.userData ? (
                <>
                  <li className="nav-item">
                    <span
                      onClick={props.logOut}
                      role="button"
                      className="nav-link"
                    >
                      Log Out
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="signIn">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
