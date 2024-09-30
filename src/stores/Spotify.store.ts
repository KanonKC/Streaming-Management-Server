import { prisma } from "../database/prisma";
import { SpotifyAuthorization } from "../types/Spotify.type";

class SpotifyStore {

    namespace = 'main';
    accessToken: string | null = null;
    refreshToken: string | null = null;
    expires: number | null = null;


    constructor() {}

    async loadToken() {
        const storage = await prisma.storage.findUnique({
            where: { namespace: this.namespace },
        });

        this.accessToken = storage?.spotifyAccessToken || null;
        this.refreshToken = storage?.spotifyRefreshToken || null;
        this.expires = storage?.spotifyTokenExpires ? storage.spotifyTokenExpires.getTime() : null;

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
        await prisma.storage.upsert({
            where: { namespace: this.namespace },
            update: {
                spotifyAccessToken: spotifyAuthorization.access_token,
                spotifyRefreshToken: spotifyAuthorization.refresh_token,
            },
            create: {
                namespace: this.namespace,
                spotifyAccessToken: spotifyAuthorization.access_token,
                spotifyRefreshToken: spotifyAuthorization.refresh_token,
                spotifyTokenExpires: new Date(Date.now() + spotifyAuthorization.expires_in * 1000),
            },
        });

        return this.loadToken();
    }
}

export const spotifyStore = new SpotifyStore();