import fastify from "fastify";
import { changeStreamTitleController } from "./controllers/ChangeStreamTitle.controller";
import { getAllTwitchChannelPointRedeemedController } from "./controllers/GetAllTwitchChannelPointRedeemed.controller";
import { getCustomWelcomeMessageController } from "./controllers/GetCustomWelcomeMessage.controller";
import { getIceBreakingQuestionController } from "./controllers/GetIceBreakingQuestion.controller";
import { getRandomFoodController } from "./controllers/GetRandomFood.controller";
import { recordTwitchChannelPointRedeemedController } from "./controllers/RecordTwitchChannelPointRedeemed.controller";
import { advancedShowFeaturedTwitchClipController, showFeaturedTwitchClipController } from "./controllers/ShowFeaturedClip.controller";
import { showImageController } from "./controllers/ShowImage.controller";
import { addMusicTrackToSpotifyPlayerController, showCurrentMusicQueueController, skipToNextMusicController, spotifyAuthorizationCallbackController } from "./controllers/Spotify.controller";
import { twitchAuthorizationCallbackController } from "./controllers/Twitch.controller";
import { createKillerQueueRequestRoutes } from "./modules/KillerQueueRequest/routes/KillerQueueRequest.route";
import { createMagicNumberMysteryBoxRoutes } from "./modules/MagicNumberMysteryBox/routes/MagicNumberMysteryBox.route";
import { createTarotCardRoutes } from "./modules/TarotCard/routes/TarotCard.route";

const server = fastify()

server.get('/title', changeStreamTitleController)
server.get('/foods', getRandomFoodController)
server.get('/ice-breaking', getIceBreakingQuestionController)
server.get('/image', showImageController)
server.get('/feature-clip', showFeaturedTwitchClipController)
server.post('/feature-clip', advancedShowFeaturedTwitchClipController)
server.get('/welcome-message/:twitchUserId', getCustomWelcomeMessageController)

createTarotCardRoutes(server)

server.get('/twitch/channel-point-redeemed', getAllTwitchChannelPointRedeemedController)
server.get('/twitch/channel-point-redeemed/create', recordTwitchChannelPointRedeemedController)

createKillerQueueRequestRoutes(server)
createMagicNumberMysteryBoxRoutes(server)

server.get('/spotify/callback', spotifyAuthorizationCallbackController)
server.get('/spotify/player', showCurrentMusicQueueController)
server.get('/spotify/player/add', addMusicTrackToSpotifyPlayerController)
server.get('/spotify/player/skip', skipToNextMusicController)

server.get('/twitch/callback', twitchAuthorizationCallbackController)

export default server