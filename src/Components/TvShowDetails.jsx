import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const TvShowDetails = () => {
  let params = useParams();
  const [tvShowDetails, setTvShowDetails] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  async function getTvShowDetails(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=696a1471eceec14b7d1196bc34911579&language=en-US`
    );
    setTvShowDetails(data);
  }

  async function getTvShowTrailer(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=696a1471eceec14b7d1196bc34911579&language=en-US`
    );

    if (data.results.length > 0) {
      const firstTrailerKey = data.results[0].key;
      setTrailerUrl(`https://www.youtube.com/embed/${firstTrailerKey}`);
    }
  }

  useEffect(() => {
    getTvShowDetails(params.id);
    getTvShowTrailer(params.id);
  }, []);

  return (
    <div className="container-fluid">
      {tvShowDetails ? (
        <>
          <div className="d-flex align-items-center justify-content-center">
            <div className="col-md-3 my-3 img-details d-flex justify-content-center align-items-center">
              <img
                className="w-100 rounded-pill"
                src={`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`}
                alt=""
              />
            </div>
            <div className="col-md-9 my-3 mx-2 trailer">
              <iframe
                className="rounded-5"
                width={"100%"}
                height="500"
                src={trailerUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
          <div className="text-md-end">
            <div className="d-flex align-items-center">
              <h2 className="h5">{tvShowDetails.name}</h2>
              <p className="m-0 px-3">
                Vote:{" "}
                <span className="bg-warning rounded-pill p-2 text-dark">
                  {tvShowDetails.vote_average.toString().slice(0, 3)}
                </span>
              </p>
            </div>
            <p className="pt-3 text-muted">{tvShowDetails.overview}</p>
          </div>
        </>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center fs-1">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}
    </div>
  );
};
