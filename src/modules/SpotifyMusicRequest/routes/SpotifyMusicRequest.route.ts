import { FastifyInstance } from "fastify";
import {
	addMusicTrackToSpotifyPlayerController,
	showCurrentMusicQueueController,
	skipToNextMusicController,
	spotifyAuthorizationCallbackController,
} from "../controllers/SpotifyMusicRequest.controller";

export function createSpotifyMusicRequestRoutes(server: FastifyInstance) {
	server.get("/spotify/callback", spotifyAuthorizationCallbackController);
	server.get("/spotify/player", showCurrentMusicQueueController);
	server.get("/spotify/player/add", addMusicTrackToSpotifyPlayerController);
	server.get("/spotify/player/skip", skipToNextMusicController);
}
