import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QUERIES, type GiphyResponse } from '@/api/giphy';

interface ImageExplorerProps {
    searchQuery: string;
}

export function ImageExplorer({ searchQuery }: ImageExplorerProps) {
    const [offset, setOffset] = useState(0);
    const limit = 3;
    const query = searchQuery.trim() || 'cat';

    const { data, isLoading, error } = useQuery<GiphyResponse>({
        queryKey: ['stickers', query, offset],
        queryFn: () => QUERIES.getStickers({ query, limit, offset }),
    });

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    const handlePrevious = () => {
        setOffset(Math.max(0, offset - limit));
    };

    const handleNext = () => {
        setOffset(offset + limit);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-full max-w-screen-lg mx-auto">
                {data?.data.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-lg flex items-center justify-center w-full">
                        <img
                            src={image.images.original.url}
                            alt={`Sticker ${index + 1}`}
                            className="w-full max-w-[200px] max-h-[200px] p-4 object-contain"
                        />
                    </div>
                ))}
            </div>
            <div className="flex gap-4">
                <Button
                    onClick={handlePrevious}
                    disabled={offset === 0}
                    variant="outline"
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNext}
                    variant="default"
                >
                    Next
                </Button>
            </div>
        </div>
    );
} 