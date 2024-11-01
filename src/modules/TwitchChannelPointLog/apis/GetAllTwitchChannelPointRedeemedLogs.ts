import { prisma } from "../../../database/prisma";

export async function getAllTwitchChannelPointRedeemedLogs(
	limit?: number,
	offset?: number
) {
	const result = await prisma.twitchChannelPointRedeemedLog.findMany({
		take: limit,
		skip: offset,
		orderBy: { id: "asc" },
	});

	return {
		data: result,
		total: await prisma.twitchChannelPointRedeemedLog.count(),
		limit,
		offset,
	};
}
