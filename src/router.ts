import fastify from "fastify";
import { changeStreamTitleController } from "./controllers/ChangeStreamTitle.controller";
import { getRandomFoodController } from "./controllers/GetRandomFood.controller";
import { getIceBreakingQuestionController } from "./controllers/GetIceBreakingQuestion.controller";
import { showImageController } from "./controllers/ShowImage.controller";
import { showFeaturedTwitchClipController } from "./controllers/ShowFeaturedClip.controller";
import { recordTwitchChannelPointRedeemedController } from "./controllers/RecordTwitchChannelPointRedeemed.controller";
import { getAllTwitchChannelPointRedeemedController } from "./controllers/GetAllTwitchChannelPointRedeemed.controller";

const server = fastify()

server.get('/title', changeStreamTitleController)
server.get('/foods', getRandomFoodController)
server.get('/ice-breaking', getIceBreakingQuestionController)
server.get('/image', showImageController)
server.get('/feature-clip', showFeaturedTwitchClipController)
server.get('/twitch/channel-point-redeemed/create', recordTwitchChannelPointRedeemedController)
server.get('/twitch/channel-point-redeemed', getAllTwitchChannelPointRedeemedController)

export default server