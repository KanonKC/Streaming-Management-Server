import { prisma } from "../database/prisma";
import { SpotifyAuthorization } from "../types/Spotify.type";

class SpotifyStore {

    namespace = 'main';

    constructor() {}

    async getToken() {
        const storage = await prisma.storage.findUnique({
            where: { namespace: this.namespace },
        });

        return {
            accessToken: storage?.spotifyAccessToken,
            refreshToken: storage?.spotifyRefreshToken,
            expires: storage?.spotifyTokenExpires,
        }
    }

    async setToken(spotifyAuthorization: SpotifyAuthorization) {
        return prisma.storage.upsert({
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
    }
}

export const spotifyStore = new SpotifyStore();