export interface GiphyImage {
    images: {
        original: {
            url: string;
        };
    };
}

export interface GiphyResponse {
    data: GiphyImage[];
} 