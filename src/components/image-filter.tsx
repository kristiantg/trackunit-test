import { Input } from "@/components/ui/input"
import { useSearchParams } from "react-router-dom";

export function ImageFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';

    const handleChange = (value: string) => {
        setSearchParams(prev => {
            prev.set('q', value);
            prev.set('offset', '0');
            return prev;
        });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b p-4">
            <div className="max-w-4xl mx-auto">
                <Input
                    type="text"
                    placeholder="Search for stickers..."
                    value={searchQuery}
                    onChange={(e) => handleChange(e.target.value)}
                    className="max-w-lg"
                />
            </div>
        </nav>
    );
}
