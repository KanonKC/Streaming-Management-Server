export interface DownloadVideo {
    url: string;
    video: {
        id: number;
        filename: string;
        platform: string;
        platformId: string;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
    }
}