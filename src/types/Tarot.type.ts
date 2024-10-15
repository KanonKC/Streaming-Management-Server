export interface TarotCard {
    id: number;
    name: string;
    description: string;
    sounds: {
        filename: string;
        voiceActor: string;
        voiceActorTwitchId: string | null;
    }[];
}