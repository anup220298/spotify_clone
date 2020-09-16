// https://developer.spotify.com
//   /documentation/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://anup-spotify-clone.netlify.app/";
const clientId = "7a5ff340cb7947aea67bc55914e7557d";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
  return (
    window.location.hash
      .substring(1)
      .split("&")
      //#access_token=YlqeUEb&token_type=Bearer&expires_in=3600
      .reduce((initial, item) => {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {})
  );
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;




