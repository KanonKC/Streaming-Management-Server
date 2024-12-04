import { prisma } from "../database/prisma";

class StreamerBotStore {
	namespace = "main";
	clientId: string | null = null;
	token: string | null = null;

	constructor() {}

	async setToken(clientId: string, token: string) {
		const result = await prisma.storage.upsert({
			where: { namespace: this.namespace },
			update: {
				streamerbotTwitchClientId: clientId,
				streamerbotTwitchToken: token,
			},
			create: {
				namespace: this.namespace,
				streamerbotTwitchClientId: clientId,
				streamerbotTwitchToken: token,
			},
		});

		this.clientId = result.streamerbotTwitchClientId;
		this.token = result.streamerbotTwitchToken;

		return {
			clientId: this.clientId,
			token: this.token,
		};
	}

    async loadToken() {
        const storage = await prisma.storage.findUnique({
            where: { namespace: this.namespace },
        });

        return {
			clientId: storage?.streamerbotTwitchClientId,
			token: storage?.streamerbotTwitchToken,
		}
    }

    getToken() {
        return {
			clientId: this.clientId,
			token: this.token,
		}
    }
}

export const streamerBotStore = new StreamerBotStore();
