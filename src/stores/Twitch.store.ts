import { LocalAccountTwitchID } from "../constants/LocalAccount.constant";
import { prisma } from "../database/prisma";
import { getTwitchAppAccessToken } from "../services/Twitch.service";
import { TwitchAppAuthorization, TwitchUserAuthorization } from "../types/Twitch.type";

class TwitchStore {

    twitchId = LocalAccountTwitchID;
    accessToken: string | null = null;
    refreshToken: string | null = null;
    expires: number | null = null;


    constructor() {}

    async loadToken(twitchId?: string) {
        
        const storage = await prisma.account.findUnique({
            where: { twitchId: twitchId || this.twitchId },
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
        
        await prisma.account.upsert({
            where: { twitchId: this.twitchId },
            update: {
                twitchAccessToken: twitchAuthorization.access_token,
                twitchRefreshToken: twitchAuthorization.refresh_token,
            },
            create: {
                twitchId: this.twitchId,
                twitchAccessToken: twitchAuthorization.access_token,
                twitchRefreshToken: twitchAuthorization.refresh_token,
                twitchTokenExpires: new Date(Date.now() + twitchAuthorization.expires_in * 1000),
            },
        });

        return this.loadToken();
    }

    async getAppAccessToken() {

        let storage = await prisma.account.findUnique({
            where: { twitchId: this.twitchId },
        });
        if (!storage || !storage.twitchAppAccessToken || (storage.twitchAppTokenExpires ?? 0) < new Date()) {
            const response = await getTwitchAppAccessToken();
            storage = await prisma.account.upsert({
                where: { twitchId: this.twitchId },
                update: {
                    twitchAppAccessToken: response.data.access_token,
                    twitchAppTokenExpires: new Date(Date.now() + response.data.expires_in * 1000),
                },
                create: {
                    twitchId: this.twitchId,
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