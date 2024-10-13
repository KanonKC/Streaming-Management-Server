export interface TwitchListAPIResponse<T> {
    data: T;
    pagination: {
        cursor: string;
    }
}

export interface TwitchUserAuthorization {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string[];
    token_type: string;
}

export interface TwitchAppAuthorization {
    access_token: string;
    expires_in: number;
    token_type: "bearer";
}

export interface CreateTwitchEventSubscriptionPayload {
    type: string;
    version: string;
    condition: Record<string, string>
    transport: {
        method: "webhook" | "websocket" | "conduit"
        callback?: string
        session_id?: string
        conduit_id?: string
        secret?: string
    }
}

export interface TwitchEventSubscription {
    data: {
        id: string;
        status: string;
        type: string;
        version: string;
        condition: Record<string, string>
        transport: {
            method: "webhook" | "websocket" | "conduit";
            callback?: string;
            session_id?: string;
            conduit_id?: string;
        }
        session_id: string
        connected_at: string;
        conduit_id: string;
        cost: number;
    }[]
    total: number;
    total_cost: number;
    max_total_cost: number;
}

export interface TwitchChannelInfo {
    data: {
        broadcaster_id: string;
        broadcaster_login: string;
        broadcaster_name: string;
        broadcaster_language: string;
        game_id: string;
        game_name: string;
        title: string;
        delay: number;
        tags: string[];
        content_classification_labels: string[];
        is_branded_content: boolean;
    }[]
}

type TwitchPredictionWindow = 30 | 60 | 120 | 300 | 600 | 900 | 1200 | 1800;
type TwitchPredictionStatus = "ACTIVE" | "CANCELED" | "RESOLVED" | "LOCKED";

export interface CreatePredctionPayload {
    broadcaster_id: string;
    title: string;
    outcomes: {
        title: string;
    }[]
    prediction_window: TwitchPredictionWindow;
}

export interface UpdatePredctionPayload {
    broadcaster_id: string;
    id: string;
    title: string;
    status: TwitchPredictionStatus;
    winning_outcome_id?: string;
}

export interface TwitchPrediction {
    data: {
        id: string,
        broadcaster_id: number,
        broadcaster_name: string,
        broadcaster_login: string,
        title: string,
        winning_outcome_id: string | null,
        outcomes: {
            id: string,
            title: string,
            users: number,
            channel_points: number,
            top_predictors: {
                user_id: string,
                user_name: string,
                user_login: string,
                channel_points_used: number
                channel_points_won: number
            }[] | null,
            color: "BLUE" | "PINK"
        }[],
        prediction_window: TwitchPredictionWindow,
        status: TwitchPredictionStatus,
        created_at: string,
        ended_at: string | null,
        locked_at: string | null
    }[]
}

export interface TwitchClip {
    id: string;
    url: string;
    embed_url: string;
    broadcaster_id: string;
    broadcaster_name: string;
    creator_id: string;
    creator_name: string;
    video_id: string;
    game_id: string;
    language: string;
    title: string;
    view_count: number;
    created_at: string;
    thumbnail_url: string;
    duration: number;
    vod_offset: number | null;
    is_featured: boolean;
}

export interface TwitchWebsocketSession {
    metadata: {
        message_id: string;
        message_type: string;
        message_timestamp: Date;
    }
    payload: {
        session: {
            id: string;
            status: string;
            connected_at: Date;
            keepalive_timeout_seconds: number;
            reconnect_url: string | null;
            recovery_url: string | null;
        }
    }
}