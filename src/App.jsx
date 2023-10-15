import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import TvShows from "./Components/TvShows";
import Home from "./Components/Home";
import Movies from "./Components/Movies";
import Actors from "./Components/Actors";
import Signin from "./Components/Signin";
import SignUp from "./Components/SignUp";
import Signout from "./Components/Signout";
import NotFound from "./Components/NotFound";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { MoviesContextProvider } from "./Store";
import { MovieDetails } from "./Components/MovieDetails";
import { TvShowDetails } from "./Components/TvShowDetails";

function App() {
  const [userData, setuserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);

    setuserData(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  function logOut() {
    setuserData(null);
    localStorage.removeItem("userToken");
    Navigate("/signin");
  }

  function ProtectedRoute(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to={"/signin"} />;
    } else {
      return props.children;
    }
  }

  return (
    <>
      <MoviesContextProvider>
        <Navbar userData={userData} logOut={logOut} />
        <div>
          <Routes>
            <Route
              path="MoviesReact-JS"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="movieDetalis"
              element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              }
            >
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <MovieDetails />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>
            <Route
              path="TvShowDetails"
              element={
                <ProtectedRoute>
                  <TvShowDetails />
                </ProtectedRoute>
              }
            >
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <TvShowDetails />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>
            <Route
              path="movies"
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />
            <Route
              path="tvshows"
              element={
                <ProtectedRoute>
                  <TvShows />
                </ProtectedRoute>
              }
            />
            <Route
              path="actors"
              element={
                <ProtectedRoute>
                  <Actors />
                </ProtectedRoute>
              }
            />
            <Route
              path="signin"
              element={<Signin saveUserData={saveUserData} />}
            />
            <Route path="signup" element={<SignUp />} />
            <Route path="signout" element={<Signout />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </MoviesContextProvider>
    </>
  );
}

export default App;
