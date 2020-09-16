import React, { useEffect, useState } from "react";
import Login from "./Login";
import Player from "./Player";
import "./App.css";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, discover_weekly, token }, dispatch] = useDataLayerValue(); //destructuring user & token

  useEffect(() => {
    const hash = getTokenFromResponse(); //method define in spotify.js file

    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist("1o04zkh4be1zjNnIrRa0Xo").then((
        response //1o04zkh4be1zjNnIrRa0Xo (id of playlist given in url of playlist)
      ) =>
        dispatch({
          type: "SET_PLAYLIST_BANNER",
          playlist_banner: response,
        })
      );
    }
  }, []);
  console.log("user is", user);
  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
