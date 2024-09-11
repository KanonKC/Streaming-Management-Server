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

export interface DownloadedVideo {
    id: number;
    filename: string;
    platform: string;
    platformId: string;
    url: string;
    title: string | null;
    startTime: number | null;
    endTime: number | null;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ConcatenatedVideo {
    id: number;
    title: string | null;
    filename: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface  DownloadAndUploadVideoResponse {
    sources: DownloadedVideo[];
    concatVideo: ConcatenatedVideo | null;
    youtubeVideoId: string | null;
}
