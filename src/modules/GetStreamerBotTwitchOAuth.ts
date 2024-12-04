import { prisma } from "../database/prisma";
import { streamerBotStore } from "../stores/StreamerBot.store";

export async function getStreamerBotTwitchOAuth(clientId: string, token: string) {
    return streamerBotStore.setToken(clientId, token)
}