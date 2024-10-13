import { prisma } from "../database/prisma";
import { getTwitchAppAccessToken } from "../services/Twitch.service";
import { TwitchAppAuthorization, TwitchUserAuthorization } from "../types/Twitch.type";

class TwitchStore {

    namespace = 'main';
    accessToken: string | null = null;
    refreshToken: string | null = null;
    expires: number | null = null;


    constructor() {}

    async loadToken(namespace?: string) {
        
        const storage = await prisma.storage.findUnique({
            where: { namespace: namespace || this.namespace },
        });

        this.accessToken = storage?.twitchAccessToken || null;
        this.refreshToken = storage?.twitchRefreshToken || null;
        this.expires = storage?.twitchTokenExpires ? storage.twitchTokenExpires.getTime() : null;

        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            expires: this.expires,
        }
    }

    async setToken(twitchAuthorization: TwitchUserAuthorization) {
        await prisma.storage.upsert({
            where: { namespace: this.namespace },
            update: {
                twitchAccessToken: twitchAuthorization.access_token,
                twitchRefreshToken: twitchAuthorization.refresh_token,
            },
            create: {
                namespace: this.namespace,
                twitchAccessToken: twitchAuthorization.access_token,
                twitchRefreshToken: twitchAuthorization.refresh_token,
                twitchTokenExpires: new Date(Date.now() + twitchAuthorization.expires_in * 1000),
            },
        });

        return this.loadToken();
    }

    async getAppAccessToken() {

        let storage = await prisma.storage.findUnique({
            where: { namespace: this.namespace },
        });
        if (!storage || !storage.twitchAppAccessToken || (storage.twitchAppTokenExpires ?? 0) < new Date()) {
            const response = await getTwitchAppAccessToken();
            storage = await prisma.storage.upsert({
                where: { namespace: this.namespace },
                update: {
                    twitchAppAccessToken: response.data.access_token,
                    twitchAppTokenExpires: new Date(Date.now() + response.data.expires_in * 1000),
                },
                create: {
                    namespace: this.namespace,
                    twitchAppAccessToken: response.data.access_token,
                    twitchAppTokenExpires: new Date(Date.now() + response.data.expires_in * 1000),
                },
            });

        }
            
        return {
            accessToken: storage.twitchAppAccessToken,
        }
    }
}

export const twitchStore = new TwitchStore();