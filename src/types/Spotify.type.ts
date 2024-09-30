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

export interface SpotifyTrack {
    uri: string
    name: string
}

export interface SpotifySearchResult {
    tracks: {
        items: SpotifyTrack[]
    }
}