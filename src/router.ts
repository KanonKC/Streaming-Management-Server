import fastify from "fastify";
import { changeStreamTitleController } from "./controllers/ChangeStreamTitle.controller";
import { getAllTwitchChannelPointRedeemedController } from "./controllers/GetAllTwitchChannelPointRedeemed.controller";
import { getCustomWelcomeMessageController } from "./controllers/GetCustomWelcomeMessage.controller";
import { getIceBreakingQuestionController } from "./controllers/GetIceBreakingQuestion.controller";
import { getRandomFoodController } from "./controllers/GetRandomFood.controller";
import { addKillerRequestController, getKillerRequestQueuesController, markKillerRequestAsDoneController } from "./controllers/KillerQueueRequest.controller";
import { createMagicNumberMysteryBoxController, solveMagicNumberMysteryBoxController } from "./controllers/MagicNumberMysteryBox.controller";
import { recordTwitchChannelPointRedeemedController } from "./controllers/RecordTwitchChannelPointRedeemed.controller";
import { revealTarotCardController } from "./controllers/RevealTarotCard.controller";
import { showFeaturedTwitchClipController } from "./controllers/ShowFeaturedClip.controller";
import { showImageController } from "./controllers/ShowImage.controller";
import { addMusicTrackToSpotifyPlayerController, showCurrentMusicQueueController, skipToNextMusicController, spotifyAuthorizationCallbackController } from "./controllers/Spotify.controller";
import { twitchAuthorizationCallbackController } from "./controllers/Twitch.controller";

const server = fastify()

server.get('/title', changeStreamTitleController)
server.get('/foods', getRandomFoodController)
server.get('/ice-breaking', getIceBreakingQuestionController)
server.get('/image', showImageController)
server.get('/feature-clip', showFeaturedTwitchClipController)
server.get('/welcome-message/:twitchUserId', getCustomWelcomeMessageController)
server.get('/tarot', revealTarotCardController)

server.get('/twitch/channel-point-redeemed', getAllTwitchChannelPointRedeemedController)
server.get('/twitch/channel-point-redeemed/create', recordTwitchChannelPointRedeemedController)

server.get('/killer-queue-requests', getKillerRequestQueuesController)
server.get('/killer-queue-requests/add', addKillerRequestController)
server.get('/killer-queue-requests/mark/:index', markKillerRequestAsDoneController)

server.get('/magic-number-mystery-boxes/create/:twitchRewardId', createMagicNumberMysteryBoxController)
server.get('/magic-number-mystery-boxes/solve/:twitchRewardId', solveMagicNumberMysteryBoxController)

server.get('/spotify/callback', spotifyAuthorizationCallbackController)
server.get('/spotify/player', showCurrentMusicQueueController)
server.get('/spotify/player/add', addMusicTrackToSpotifyPlayerController)
server.get('/spotify/player/skip', skipToNextMusicController)

server.get('/twitch/callback', twitchAuthorizationCallbackController)

export default server