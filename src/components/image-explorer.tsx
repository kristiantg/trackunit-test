import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QUERIES, type GiphyResponse } from '@/api/giphy';

export function ImageExplorer() {
    const [offset, setOffset] = useState(0);
    const limit = 3;

    const { data, isLoading, error } = useQuery<GiphyResponse>({
        queryKey: ['cat-stickers', offset],
        queryFn: () => QUERIES.getStickers({ query: 'cat', limit, offset }),
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
            <div className="grid grid-cols-1 md:grid-cols-3 h-fit gap-4 p-4">
                {data?.data.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={image.images.original.url}
                            alt={`Cat sticker ${index + 1}`}
                            className="max-w-[200px] max-h-[200px] object-cover"
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