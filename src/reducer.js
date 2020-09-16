export const initialState = {
  user: null,
  playlists: [],
  item: null,
  playing: false,
  //token: "null", //remove after developing
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_PLAYLIST_BANNER":
      return {
        ...state,
        playlist_banner: action.playlist_banner,
      };
    default:
      return state;
  }
};

export default reducer;
