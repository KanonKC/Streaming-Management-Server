import { prisma } from "../database/prisma";
import { getRefreshToken } from "../services/Spotify.service";
import { SpotifyAuthorization } from "../types/Spotify.type";

class SpotifyStore {

    namespace = 'main';
    accessToken: string | null = null;
    refreshToken: string | null = null;
    expires: Date | null = null;

    constructor() {}

    async loadToken() {
        const storage = await prisma.storage.findUnique({
            where: { namespace: this.namespace },
        });

        if ((!storage || !storage?.spotifyTokenExpires || storage?.spotifyTokenExpires < new Date()) && this.refreshToken) {
            const newRefreshToken = await getRefreshToken(this.refreshToken);
            await this.setToken(newRefreshToken.data);
        }

        this.accessToken = storage?.spotifyAccessToken || null;
        this.refreshToken = storage?.spotifyRefreshToken || null;
        this.expires = storage?.spotifyTokenExpires ? storage.spotifyTokenExpires : null;

        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            expires: this.expires,
        }
    }

    getToken() {
        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            expires: this.expires,
        }
    }

    async setToken(spotifyAuthorization: SpotifyAuthorization) {
        const result = await prisma.storage.upsert({
            where: { namespace: this.namespace },
            update: {
                spotifyAccessToken: spotifyAuthorization.access_token,
                spotifyRefreshToken: spotifyAuthorization.refresh_token,
                spotifyTokenExpires: new Date(Date.now() + spotifyAuthorization.expires_in * 1000),
            },
            create: {
                namespace: this.namespace,
                spotifyAccessToken: spotifyAuthorization.access_token,
                spotifyRefreshToken: spotifyAuthorization.refresh_token,
                spotifyTokenExpires: new Date(Date.now() + spotifyAuthorization.expires_in * 1000),
            },
        });

        this.accessToken = result.spotifyAccessToken;
        this.refreshToken = result.spotifyRefreshToken;
        this.expires = result.spotifyTokenExpires;

        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            expires: this.expires,
        }
    }
}

export const spotifyStore = new SpotifyStore();