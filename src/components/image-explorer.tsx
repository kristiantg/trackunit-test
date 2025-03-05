import { useQuery } from '@tanstack/react-query';

interface GiphyImage {
    images: {
        original: {
            url: string;
        };
    };
}

interface GiphyResponse {
    data: GiphyImage[];
}

export function ImageExplorer() {
    const { data, isLoading, error } = useQuery<GiphyResponse>({
        queryKey: ['cat-stickers'],
        queryFn: async () => {
            const response = await fetch(
                'https://api.giphy.com/v1/stickers/search?q=cat&limit=3&rating=g&api_key=1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq'
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {data?.data.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={image.images.original.url}
                        alt={`Cat sticker ${index + 1}`}
                        className="w-full h-auto object-cover"
                    />
                </div>
            ))}
        </div>
    );
} 