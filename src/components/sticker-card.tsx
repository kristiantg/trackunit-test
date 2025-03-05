import { type GiphyImage } from '@/api/giphy';

interface StickerCardProps {
    image: GiphyImage;
    index: number;
    textPosition: string;
}

export function StickerCard({ image, index, textPosition }: StickerCardProps) {
    return (
        <div className="rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-center w-[240px] h-[280px]">
            <div className="relative w-[240px] h-[240px] flex items-center justify-center">
                <div className="p-4 w-full h-full flex items-center justify-center">
                    <img
                        src={image.images.original.url}
                        alt={`Sticker ${index + 1}`}
                        className="w-[200px] h-[200px] object-contain"
                    />
                </div>
                {textPosition === 'top-center' && (
                    <p className="absolute top-0 left-0 right-0 text-center p-2 bg-black bg-opacity-50 text-white">
                        {image.title}
                    </p>
                )}
                {textPosition === 'bottom-center' && (
                    <p className="absolute bottom-0 left-0 right-0 text-center p-2 bg-black bg-opacity-50 text-white">
                        {image.title}
                    </p>
                )}
            </div>
            <div className="h-[40px] w-full flex items-center justify-center">
                {textPosition === 'below-center' && (
                    <p className="text-center p-2">{image.title}</p>
                )}
            </div>
        </div>
    );
} 