import { prisma } from "../database/prisma";
import { TwitchAuthorization } from "../types/Twitch.type";

class TwitchStore {

    namespace = 'main';
    accessToken: string | null = null;
    refreshToken: string | null = null;
    expires: Date | null = null;


    constructor() {}

    async loadToken() {
        const storage = await prisma.storage.findUnique({
            where: { namespace: this.namespace },
        });

        this.accessToken = storage?.twitchAccessToken || null;
        this.refreshToken = storage?.twitchRefreshToken || null;
        this.expires = storage?.twitchTokenExpires ? storage.twitchTokenExpires : null;

        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            expires: this.expires,
        }
    }

    async isTokenValid() {
        await this.loadToken();
        if (!this.accessToken || !this.refreshToken || !this.expires) {
            return false;
        }

        return this.expires > new Date();
    }

    getToken() {
        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            expires: this.expires,
        }
    }

    async setToken(twitchAuthorization: TwitchAuthorization) {
        await prisma.storage.upsert({
            where: { namespace: this.namespace },
            update: {
                twitchAccessToken: twitchAuthorization.access_token,
                twitchRefreshToken: twitchAuthorization.refresh_token,
                twitchTokenExpires: new Date(Date.now() + twitchAuthorization.expires_in * 1000),
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
}

export const twitchStore = new TwitchStore();