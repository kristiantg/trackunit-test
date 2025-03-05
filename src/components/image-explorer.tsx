import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { QUERIES, type GiphyResponse } from '@/api/giphy';
import { StickerCard } from '@/components/sticker-card';
import { PaginationControls } from '@/components/pagination-controls';

export function ImageExplorer() {
    const [searchParams, setSearchParams] = useSearchParams();
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const query = (searchParams.get('q') || '').trim();
    const textPosition = searchParams.get('textPosition') || 'below-center';
    const limit = 3;

    const { data, isLoading, error } = useQuery<GiphyResponse>({
        queryKey: ['stickers', query, offset],
        queryFn: () => QUERIES.getStickers({ query, limit, offset }),
    });

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

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    const hasStickers = data && data.data.length > 0;

    return (
        <div className="flex flex-col items-center gap-4">
            {!hasStickers ? (
                <div className="text-center text-gray-500">No stickers found</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-full max-w-screen-lg mx-auto">
                    {data?.data.map((image, index) => (
                        <StickerCard
                            key={index}
                            image={image}
                            index={index}
                            textPosition={textPosition}
                        />
                    ))}
                </div>
            )}

            {hasStickers && (
                <PaginationControls
                    offset={offset}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                />
            )}
        </div>
    );
} 