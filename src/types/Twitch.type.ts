export interface TwitchListAPIResponse<T> {
    data: T;
    pagination: {
        cursor: string;
    }
}

export interface TwitchAuthorization {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string[];
    token_type: string;
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

export type TwitchPredictionWindow = 30 | 60 | 120 | 300 | 600 | 900 | 1200 | 1800;
export type TwitchPredictionStatus = "ACTIVE" | "CANCELED" | "RESOLVED" | "LOCKED";
export type TwitchRewardRedemptionStatus = "CANCELED" | "FULFILLED" | "UNFULFILLED"
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

export interface TwitchUser {
    id: string;
    login: string;
    display_name: string;
    type: "staff" | "admin" | "global_mod" | "";
    broadcaster_type: "partner" | "affiliate" | "";
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    email: string;
    created_at: string;
}

export interface TwitchUsers {
    data: TwitchUser[]
}

export interface TwitchUserChatColor {
    user_id: string;
    user_login: string;
    user_name: string;
    color: string;
}

export interface TwitchUsersChatColor {
    data: TwitchUserChatColor[]
}

export interface TwitchGame {
    id: string;
    name: string;
    box_art_url: string;
    igdb_id: string;
}

export interface TwitchRewardRedemption {
    broadcaster_name: string;
    broadcaster_login: string;
    broadcaster_id: string;
    id: string;
    user_login: string;
    user_id: string;
    user_name: string;
    user_input: string;
    status: string;
    redeemed_at: string;
    reward: {
        id: string
        title: string
        prompt: string
        cost: number
    }
}

export interface TwitchCustomReward {
    broadcaster_name: string
    broadcaster_id: string
    id: string
    image: string
    background_color: string
    is_enabled: string
    cost: number
    title: string
    prompt: string
    is_user_input_required: boolean
    max_per_stream_setting: {
        is_enabled: boolean
        max_per_stream: number
    },
    max_per_user_per_stream_setting: {
        is_enabled: boolean
        max_per_user_per_stream: number
    },
    global_cooldown_setting: {
        is_enabled: boolean
        global_cooldown_seconds: number
    },
    is_paused: boolean
    is_in_stock: boolean
    default_image: {
        url_1x: string
        url_2x: string
        url_4x: string
    },
    should_redemptions_skip_request_queue: boolean
    redemptions_redeemed_current_stream: number
    cooldown_expires_at: string
}