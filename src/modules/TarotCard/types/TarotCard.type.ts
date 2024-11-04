export interface TarotCardSoundProfile {
    filename: string;
    voiceActor: string;
    voiceActorTwitchId: string | null;
    voiceActorCustomURL?: string;
}

export interface TarotCard {
    id: number;
    name: string;
    description: string;
    sounds: TarotCardSoundProfile[];
}