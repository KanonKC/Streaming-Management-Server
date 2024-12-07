import fastify from "fastify";
import { changeStreamTitleController } from "./controllers/ChangeStreamTitle.controller";
import { getIceBreakingQuestionController } from "./controllers/GetIceBreakingQuestion.controller";
import { getRandomFoodController } from "./controllers/GetRandomFood.controller";
import { twitchAuthorizationCallbackController } from "./controllers/Twitch.controller";
import { createCustomWelcomeMessageRoutes } from "./modules/CustomWelcomeMessage/routes/CustomWelcomeMessage.route";
import { createKillerQueueRequestRoutes } from "./modules/KillerQueueRequest/routes/KillerQueueRequest.route";
import { createMagicNumberMysteryBoxRoutes } from "./modules/MagicNumberMysteryBox/routes/MagicNumberMysteryBox.route";
import { createShowAnImageRoutes } from "./modules/ShowAnImage/routes/ShowAnImage.route";
import { createShowTwtichClipRoutes } from "./modules/ShowTwitchClip/routes/ShowTwitchClip.route";
import { createSpotifyMusicRequestRoutes } from "./modules/SpotifyMusicRequest/routes/SpotifyMusicRequest.route";
import { createTarotCardRoutes } from "./modules/TarotCard/routes/TarotCard.route";
import { createTwitchChannelPointLog } from "./modules/TwitchChannelPointLog/routes/TwitchChannelPointLog";
import { createMathGameRoutes } from "./modules/MathGame/routes/MathGame.route";
import { createHangedManGameRoutes } from "./modules/HangedManGame/routes/HangedManGame.router";
import { createChannelPointRedeemRoutes } from "./modules/ChannelPointRedeem/routes/ChannelPointRedeem.route";
import { createCustomPointRoutes } from "./modules/CustomPoint/routes/CustomPoint.route";
import { getStreamerBotTwitchOAuthController } from "./controllers/StreamerBot.controller";
import { createForbiddenWordsRoutes } from "./modules/ForbiddenWords/routes/ForbiddenWords.route";

const server = fastify()

server.get('/title', changeStreamTitleController)
server.get('/foods', getRandomFoodController)
server.get('/ice-breaking', getIceBreakingQuestionController)

createShowTwtichClipRoutes(server)
createCustomWelcomeMessageRoutes(server)
createShowAnImageRoutes(server)
createTarotCardRoutes(server)

createTwitchChannelPointLog(server)

createKillerQueueRequestRoutes(server)
createMagicNumberMysteryBoxRoutes(server)

createSpotifyMusicRequestRoutes(server)
createMathGameRoutes(server)

createHangedManGameRoutes(server)
createChannelPointRedeemRoutes(server)
createCustomPointRoutes(server)

createForbiddenWordsRoutes(server)

server.get('/twitch/callback', twitchAuthorizationCallbackController)
server.get('/streamer-bot/callback', getStreamerBotTwitchOAuthController)

export default server