import { configDotenv } from "dotenv";
import {
	CreatePredctionPayload,
	TwitchAuthorization,
	TwitchChannelInfo,
	TwitchClip,
	TwitchCustomReward,
	TwitchGame,
	TwitchListAPIResponse,
	TwitchPrediction,
	TwitchRewardRedemption,
	TwitchRewardRedemptionStatus,
	TwitchUsers,
	TwitchUsersChatColor,
	UpdatePredctionPayload,
} from "../types/Twitch.type";
import axios, { AxiosResponse } from "axios";
import { ListAPIResponse } from "../types/Controller.type";
import { generateRandomString } from "../utils/RandomString.util";
import { twitchStore } from "../stores/Twitch.store";

configDotenv();
const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_OAUTH_TOKEN, PORT } =
	process.env;

const twitchAPI = axios.create({
	baseURL: "https://api.twitch.tv/helix",
	headers: {
		"Client-Id": TWITCH_CLIENT_ID,
		Authorization: `Bearer ${TWITCH_OAUTH_TOKEN}`,
	},
});

export const TwitchOAuthScopes = [
	"channel:manage:predictions",
	"channel:manage:redemptions",
];

export function getTwitchOAuthUrl() {
	const randomString = generateRandomString(16);
	return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${TWITCH_CLIENT_ID}&redirect_uri=http://localhost:${PORT}/twitch/callback&scope=${TwitchOAuthScopes.join(
		"%20"
	)}&state=${randomString}`;
}

export async function getUserLoginAccessToken(
	code: string
): Promise<AxiosResponse<TwitchAuthorization>> {
	const authOptions = {
		url: "https://id.twitch.tv/oauth2/token",
		form: {
			code: code,
			client_id: TWITCH_CLIENT_ID,
			client_secret: TWITCH_CLIENT_SECRET,
			redirect_uri: `http://localhost:${PORT}/twitch/callback`,
			grant_type: "authorization_code",
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		json: true,
	};

	return axios.post(authOptions.url, authOptions.form, {
		headers: authOptions.headers,
	});
}

export async function getChannelInfo(broadcasterId: string) {
	return twitchAPI.get<TwitchChannelInfo>("/channels", {
		params: { broadcaster_id: broadcasterId },
	});
}

export async function createPrediction(payload: CreatePredctionPayload) {
	const { accessToken } = await twitchStore.loadToken();
	return twitchAPI.post<TwitchPrediction>("/predictions", payload, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

export async function updatePrediction(payload: UpdatePredctionPayload) {
	const { accessToken } = await twitchStore.loadToken();
	return twitchAPI.patch<TwitchPrediction>("/predictions", payload, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

export async function getTwitchClips(
	broadcasterId: string,
	isFeature: boolean
) {
	return twitchAPI.get<ListAPIResponse<TwitchClip>>("/clips", {
		params: { broadcaster_id: broadcasterId, is_featured: isFeature },
	});
}

export async function getTwitchUserById(id: string) {
	return twitchAPI.get<TwitchUsers>("/users", { params: { id } });
}

export async function getTwitchUsersById(ids: string[]) {
	const queryString = ids.map((id: string) => `id=${id}`).join("&");
	return twitchAPI.get<TwitchUsers>(`/users?${queryString}`);
}

export async function getTwitchUsersChatColorById(ids: string[]) {
	const queryString = ids.map((id: string) => `user_id=${id}`).join("&");
	return twitchAPI.get<TwitchUsersChatColor>(`/chat/color?${queryString}`);
}

export async function getTwitchGamesByIds(ids: string[]) {
	const queryString = ids.map((id: string) => `id=${id}`).join("&");
	return twitchAPI.get<TwitchListAPIResponse<TwitchGame[]>>(
		`/games?${queryString}`
	);
}

export async function getTwitchCustomRewardRedemption(
	broadcasterId: string,
	rewardId: string,
	status: TwitchRewardRedemptionStatus,
	stmbClientId: string,
	stmbToken: string,
	options?: {
		first?: number;
		after?: string;
	}
) {
	return twitchAPI.get<TwitchListAPIResponse<TwitchRewardRedemption[]>>(
		`/channel_points/custom_rewards/redemptions`,
		{
			params: {
				broadcaster_id: broadcasterId,
				reward_id: rewardId,
				status: status,
				first: options?.first,
				after: options?.after,
			},
			headers: {
				"Client-ID": stmbClientId,
				Authorization: `Bearer ${stmbToken}`,
			},
		}
	);
}

export async function udpateTwitchRedemptionStatus(
	broadcasterId: string,
	rewardId: string,
	id: string,
	status: "CANCELED" | "FULFILLED",
	stmbClientId: string,
	stmbToken: string
) {
	return twitchAPI.patch<TwitchListAPIResponse<TwitchRewardRedemption[]>>(
		`/channel_points/custom_rewards/redemptions`,
		{
			status: status,
		},
		{
			params: {
				broadcaster_id: broadcasterId,
				reward_id: rewardId,
				id: id,
			},
			headers: {
				"Client-ID": stmbClientId,
				Authorization: `Bearer ${stmbToken}`,
			},
		}
	);
}

export async function getTwitchCustomReward(broadcasterId: string) {
    const { accessToken } = await twitchStore.loadToken();
	return twitchAPI.get<TwitchListAPIResponse<TwitchCustomReward[]>>(
		"/channel_points/custom_rewards",
		{
			params: {
				broadcaster_id: broadcasterId,
			},
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
		}
	);
}
