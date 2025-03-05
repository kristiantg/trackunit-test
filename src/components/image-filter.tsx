import { Input } from "@/components/ui/input"
import { useSearchParams } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ImageFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const textPosition = searchParams.get('textPosition') || 'below-center';

    const handleChange = (value: string) => {
        setSearchParams(prev => {
            prev.set('q', value);
            prev.set('offset', '0');
            return prev;
        });
    };

    const handleTextPositionChange = (value: string) => {
        setSearchParams(prev => {
            prev.set('textPosition', value);
            return prev;
        });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b p-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
                <Input
                    type="text"
                    placeholder="Search for stickers..."
                    value={searchQuery}
                    onChange={(e) => handleChange(e.target.value)}
                    className="flex-1"
                />
                <Select value={textPosition} onValueChange={handleTextPositionChange}>
                    <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Select text position" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="top-center">On top of image - center top</SelectItem>
                        <SelectItem value="bottom-center">On top of image - center bottom</SelectItem>
                        <SelectItem value="below-center">Below image - center</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </nav>
    );
}
