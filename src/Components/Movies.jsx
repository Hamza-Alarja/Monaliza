import { React, useContext } from "react";
import { moviesContext } from "../Store";
import { Link } from "react-router-dom";

export default function Movies() {
  let { trendingMovies } = useContext(moviesContext);
  return (
    <div>
      <div className="home-page">
        <h1>Monaliza Movies & Shows</h1>
        <p>Find the latest and greatest movies and shows</p>
        <div>
          <button className="btn ms-3">
            <Link className="nav-link" to="/tvshows">
              Tv Shows
            </Link>
          </button>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row my-5 py-5 ">
          <div className="col-lg-3 col-md-4 col-sm-6 my-2 d-flex align-items-center">
            <div className="ms-3">
              <h3 className="fs-2">
                Trending <br /> Movies
              </h3>
              <p className="text-muted">Find the latest and greatest movies</p>
            </div>
          </div>
          {trendingMovies.map((movie, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 my-2">
              <div className="moviesTrenidng text-center">
                <Link to={`/movieDetalis/${movie.id}`}>
                  <div className="posterFilm">
                    <img
                      className="w-100"
                      src={
                        "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                      }
                      alt=""
                    />
                  </div>
                </Link>
                <span className="rate ">
                  {movie.vote_average.toString().slice(0, 3)}
                </span>

                <div className="details">
                  <h3 className="movie-title h6 my-2 ">{movie.title}</h3>
                </div>
                <div className="overview text-muted">
                  {movie.overview.slice(0, 60)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
