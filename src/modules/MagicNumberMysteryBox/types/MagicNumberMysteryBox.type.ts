export interface CreateMagicNumberMysteryBoxPayload {
    minNumber?: number;
    maxNumber?: number;
    correctNumber?: number;
}

export interface SolveMagicNumberMysteryBoxPayload {
    twitchUserId: string;
    twitchUsername: string;
    guessNumber: number;
}