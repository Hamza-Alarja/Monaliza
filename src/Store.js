import { createContext } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
export let moviesContext = createContext(0);

export function MoviesContextProvider(props) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);

  async function getTrending(mediaTybe, callBack) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaTybe}/week?api_key=696a1471eceec14b7d1196bc34911579`
    );
    callBack(data.results.slice(0, 11));
  }

  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTv);
  }, []);

  return (
    <moviesContext.Provider value={{ trendingMovies, trendingTv }}>
      {props.children}
    </moviesContext.Provider>
  );
}
