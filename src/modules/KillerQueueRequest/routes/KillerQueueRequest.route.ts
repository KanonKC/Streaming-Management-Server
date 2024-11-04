import { FastifyInstance } from "fastify";
import {
	addKillerRequestController,
	getKillerRequestQueuesController,
	markKillerRequestAsDoneController,
} from "../controllers/KillerQueueRequest.controller";

export function createKillerQueueRequestRoutes(server: FastifyInstance) {
	server.get("/killer-queue-requests", getKillerRequestQueuesController);
	server.get("/killer-queue-requests/add", addKillerRequestController);
	server.get(
		"/killer-queue-requests/mark/:index",
		markKillerRequestAsDoneController
	);
}
