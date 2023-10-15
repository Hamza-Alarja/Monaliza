import { React, useContext } from "react";
import { moviesContext } from "./../Store";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function Home() {
  let { trendingMovies, trendingTv } = useContext(moviesContext);

  const carouselItems = trendingMovies.map((movie, index) => (
    <SwiperSlide key={index}>
      <div>
        <Link to={`/movieDetalis/${movie.id}`}>
          <img
            className="w-100"
            src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
            alt=""
          />
        </Link>
      </div>
    </SwiperSlide>
  ));
  return (
    <>
      <div className="home-page">
        <h1>Monaliza Movies & Shows</h1>
        <p>Find the latest and greatest movies and shows</p>
        <div>
          <button className="btn  ">
            <Link className="nav-link" to="/movies">
              Movies
            </Link>
          </button>
          <button className="btn  ms-3">
            <Link className="nav-link" to="/tvshows">
              Tv Shows
            </Link>
          </button>
        </div>
      </div>      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={5}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {carouselItems}
      </Swiper>
      <div className="container-fluid">
        <div className="row py-5 ">
          <div className="col-lg-3 col-md-4 col-sm-6 my-2 d-flex align-items-center">
            <div className="ms-3">
              <h3 className="fs-2">
                Trending <br /> Movies & Shows
              </h3>
              <p className="text-muted">
                Find the latest and greatest movies and shows
              </p>
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
        <div className="row my-5">
          <div className="col-md-3 d-flex align-items-center">
            <div className="ms-3">
              <h3 className="fs-2">
                Trending <br /> Movies & Shows
              </h3>
              <p className="text-muted">
                Find the latest and greatest movies and shows
              </p>
            </div>
          </div>
          {trendingTv.map((tv, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 my-2">
              <div className="moviesTrenidng text-center">
                <div className="posterFilm">
                  <img
                    className="w-100"
                    src={"https://image.tmdb.org/t/p/w500/" + tv.poster_path}
                    alt=""
                  />
                </div>
                <div className="rate ">
                  {tv.vote_average.toString().slice(0, 3)}
                </div>

                <div className="details">
                  <h3 className="movie-title h6 my-2 ">{tv.name}</h3>
                </div>
                <div className="overview text-muted">
                  {tv.overview.slice(0, 60)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
