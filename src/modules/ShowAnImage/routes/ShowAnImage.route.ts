import { FastifyInstance } from "fastify";
import { advancedShowAnImageController, showAnImageController } from "../controllers/ShowAnImage.controller";

export function createShowAnImageRoutes(server: FastifyInstance) {
    server.get('/image', showAnImageController)
    server.post('/image', advancedShowAnImageController)
}