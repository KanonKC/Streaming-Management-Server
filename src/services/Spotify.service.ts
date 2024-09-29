import axios, { AxiosResponse } from "axios";
import { configDotenv } from "dotenv";
import { generateRandomString } from "../utils/RandomString.util";
import { post } from "request";
import { SpotifyAuthorization } from "../types/Spotify.type";

configDotenv();
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, PORT } = process.env;

const spotifyAPI = axios.create({
    baseURL: 'https://api.spotify.com/v1',
})

export function getOAuthUrl() {
    const randomString = generateRandomString(16);
    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=user-modify-playback-state&redirect_uri=http://localhost:${PORT}/spotify/callback&state=${randomString}`
}

// export async function getUserLoginAccessToken(code: string) {
//     const authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         form: {
//           code: code,
//           redirect_uri: `http://localhost:${PORT}/spotify/callback`,
//           grant_type: 'authorization_code'
//         },
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           Authorization: 'Basic ' +
//             (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
//         },
//         json: true
//     };

//     post(authOptions, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
  
//             const { access_token, refresh_token } = body;
//             console.log(access_token, refresh_token)
//             return { accessToken: access_token, refreshToken: refresh_token }
          
//         }
//         else {
//             console.error(error)
//         }
//     });
// } 

export async function getUserLoginAccessToken(code: string): Promise<AxiosResponse<SpotifyAuthorization>> {
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: `http://localhost:${PORT}/spotify/callback`,
          grant_type: 'authorization_code'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' +
            (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    return axios.post(authOptions.url, authOptions.form, {
        headers: authOptions.headers
    })
} 

