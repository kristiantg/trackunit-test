export interface GiphyImage {
    title: string;
    images: {
        original: {
            url: string;
        };
    };
}

export interface GiphyResponse {
    data: GiphyImage[];
} 