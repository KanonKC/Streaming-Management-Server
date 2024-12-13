import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { configDotenv } from "dotenv";
import server from "./router";
import { getSpotifyOAuthUrl } from "./services/Spotify.service";
import { getTwitchOAuthUrl } from "./services/Twitch.service";
import path from "path";
import { loadRewardRedemptionFromTwitch } from "./modules/ChannelPointRedeem/apis/LoadRewardRedemptionFromTwitch";
import { twitchStore } from "./stores/Twitch.store";
import { spotifyStore } from "./stores/Spotify.store";

configDotenv();
const PORT = Number(process.env.PORT) || 8080;

server.register(cors, {
	origin: "*",
});

// server.register(fastifyStatic, {
//     root: path.join(process.cwd(), 'dumps'),
//     prefix: '/public/',
//     wildcard: true
// })

server.register(fastifyStatic, {
	root: path.join(process.cwd(), "assets"),
	prefix: "/public/",
	wildcard: true,
});

server.listen({ port: PORT }, async (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	//   loadRewardRedemptionFromTwitch()
	console.log(`Server listening at ${address}`);
	const isTwitchTokenValid = await twitchStore.isTokenValid();
	if (!isTwitchTokenValid) {
        console.log("⚠️ Twitch token is invalid! Please generate a new one.");
		console.log(getTwitchOAuthUrl());
	} else {
        console.log("✅ Twitch token is valid.");
    }
	const isSpotifyTokenValid = await spotifyStore.isTokenValid();
	if (!isSpotifyTokenValid) {
        console.log("⚠️ Spotify token is invalid! Please generate a new one.");
		console.log(getSpotifyOAuthUrl());
	} else {
        console.log("✅ Spotify token is valid.");
    }
});
