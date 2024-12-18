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

server.get('/twitch/callback', twitchAuthorizationCallbackController)

export default server