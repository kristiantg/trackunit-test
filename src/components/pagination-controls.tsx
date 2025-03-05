import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
    offset: number;
    onPrevious: () => void;
    onNext: () => void;
}

export function PaginationControls({ offset, onPrevious, onNext }: PaginationControlsProps) {
    return (
        <div className="flex gap-4">
            <Button onClick={onPrevious} disabled={offset === 0} variant="outline">
                Previous
            </Button>
            <Button onClick={onNext} variant="default">
                Next
            </Button>
        </div>
    );
} 