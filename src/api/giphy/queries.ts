import { GiphyResponse } from './index';

const GIPHY_API_KEY = '1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq';
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/stickers';

interface SearchParams {
    query: string;
    limit: number;
    offset: number;
    rating?: 'g' | 'pg' | 'pg-13' | 'r';
}

export const QUERIES = {
    getStickers: async ({ query, limit, offset, rating = 'g' }: SearchParams): Promise<GiphyResponse> => {
        const response = await fetch(
            `${GIPHY_BASE_URL}/search?q=${query}&limit=${limit}&offset=${offset}&rating=${rating}&api_key=${GIPHY_API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }
}; 