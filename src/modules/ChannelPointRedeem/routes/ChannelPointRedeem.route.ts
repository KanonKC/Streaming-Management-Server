import { FastifyInstance } from "fastify";
import {
	getRedeemableChannelPointAmountController,
	getRedeemableChannelPointAmountListController,
	redeemChannelPointFromCustomPointController,
} from "../controllers/ChannelPointRedeem.controller";

export function createChannelPointRedeemRoutes(server: FastifyInstance) {
	server.get(
		"/channel-point-redeem/redeemable-point",
		getRedeemableChannelPointAmountController
	);
	server.get(
		"/channel-point-redeem/redeemable-point-list",
		getRedeemableChannelPointAmountListController
	);
	server.get(
		"/channel-point-redeem",
		redeemChannelPointFromCustomPointController
	);
}
