import { Favorite, PlayCircleFilled, MoreHoriz } from "@material-ui/icons";
import React from "react";
import "./Body.css";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import SongRow from "./SongRow";

function Body({ spotify }) {
  const [{ playlist_banner }, dispatch] = useDataLayerValue();
  // console.log("discover weekly: ", playlist_banner);
  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:1o04zkh4be1zjNnIrRa0Xo`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          console.log("item is  ", r);
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          console.log("item is  ", r);
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body_info">
        <img src={playlist_banner?.images[0].url} alt="" />

        <div className="body_infotext">
          <strong>PLAYLIST</strong>
          <h2>Firstone</h2>
          <p>{playlist_banner?.description}</p>
        </div>
      </div>
      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilled onClick={playPlaylist} className="body_shuffle" />
          <Favorite fontSize="large" />
          <MoreHoriz />
        </div>
        {/*list of songs */}
        {playlist_banner?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Body;
