import { FastifyInstance } from "fastify";
import { createMagicNumberMysteryBoxController, solveMagicNumberMysteryBoxController } from "../controllers/MagicNumberMysteryBox.controller";

export function createMagicNumberMysteryBoxRoutes(server: FastifyInstance) {
    server.get('/magic-number-mystery-boxes/create/:twitchRewardId', createMagicNumberMysteryBoxController)
    server.get('/magic-number-mystery-boxes/solve/:twitchRewardId', solveMagicNumberMysteryBoxController)
}