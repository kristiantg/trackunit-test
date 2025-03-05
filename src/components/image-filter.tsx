import { Input } from "@/components/ui/input"

interface ImageFilterProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

export function ImageFilter({ searchQuery, onSearchChange }: ImageFilterProps) {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b p-4">
            <div className="max-w-4xl mx-auto">
                <Input
                    type="text"
                    placeholder="Search for stickers..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="max-w-lg"
                />
            </div>
        </nav>
    );
}
