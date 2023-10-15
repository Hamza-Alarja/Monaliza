import { React, useContext } from "react";
import { moviesContext } from "../Store";
import { Link } from "react-router-dom";

export default function TvShows() {
  let { trendingTv } = useContext(moviesContext);

  return (
    <div>
      <div className="home-page">
        <h1>Monaliza Movies & Shows</h1>
        <p>Find the latest and greatest movies and shows</p>
        <div>
          <button className="btn  ms-3">
            <Link className="nav-link" to="/movies">
              Movies
            </Link>
          </button>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row my-5 py-5 ">
          <div className="col-lg-3 col-md-4 col-sm-6 my-2 d-flex align-items-center">
            <div className="ms-3">
              <h3 className="fs-2">
                Trending <br /> Tv Shows
              </h3>
              <p className="text-muted">
                Find the latest and greatest Tv Shows
              </p>
            </div>
          </div>
          {trendingTv.map((TvShows, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 my-2">
              <div className="moviesTrenidng text-center">
                <Link to={`/TvShowDetails/${TvShows.id}`}>
                  <div className="posterFilm">
                    <img
                      className="w-100"
                      src={
                        "https://image.tmdb.org/t/p/w500/" + TvShows.poster_path
                      }
                      alt=""
                    />
                  </div>
                </Link>
                <span className="rate ">
                  {TvShows.vote_average.toString().slice(0, 3)}
                </span>

                <div className="details">
                  <h3 className="TvShow-title h6 my-2 ">{TvShows.title}</h3>
                </div>
                <div className="overview text-muted">
                  {TvShows.overview.slice(0, 60)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
