import { FastifyInstance } from "fastify";
import { advancedShowFeaturedTwitchClipController, showFeaturedTwitchClipController } from "../controllers/ShowTwitchClip.controller";

export function createShowTwtichClipRoutes(server: FastifyInstance) {
    server.get('/feature-clip', showFeaturedTwitchClipController)
    server.post('/feature-clip', advancedShowFeaturedTwitchClipController)
}