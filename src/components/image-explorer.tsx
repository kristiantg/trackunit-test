import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { QUERIES, type GiphyResponse } from '@/api/giphy';

export function ImageExplorer() {
    const [searchParams, setSearchParams] = useSearchParams();
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const query = (searchParams.get('q') || '').trim();
    const limit = 3;

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
        const newOffset = Math.max(0, offset - limit);
        setSearchParams(prev => {
            prev.set('offset', newOffset.toString());
            return prev;
        });
    };

    const handleNext = () => {
        setSearchParams(prev => {
            prev.set('offset', (offset + limit).toString());
            return prev;
        });
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {data && data.data.length === 0 ? (
                <div className="text-center text-gray-500">No stickers found</div>
            ) : (
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
            )}
            {data && data.data.length > 0 && (
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
            )}
        </div>
    );
} 