export interface SpotifyAuthorization {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
}

export interface AddItemToPlaybackQueuePayload {
    uri: string
    device_id?: string
}

export interface SpotifyArtist {
    name: string
    uri: string
}

export interface SpotifyTrack {
    artists: SpotifyArtist[]
    name: string
    uri: string
    href: string
    external_urls: {
        spotify: string
    }
}

export interface SpotifySearchResult {
    tracks: {
        items: SpotifyTrack[]
    }
}

export interface SpotifyUserQueue {
    currently_playing: SpotifyTrack | null
    queue: SpotifyTrack[]
}