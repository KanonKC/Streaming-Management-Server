import { FastifyInstance } from "fastify";
import { createGame24Controller, resolveGame24Controller } from "../controllers/Game24.controller";

export function createGame24Routes(server: FastifyInstance) {
	server.get("/game-24/create", createGame24Controller);
    server.get("/game-24/resolve/:twitchUserId", resolveGame24Controller);
}
