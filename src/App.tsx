import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ImageExplorer } from './components/image-explorer';
import { ImageFilter } from './components/image-filter';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full">
        <ImageFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <div className="pt-24 flex justify-center">
          <ImageExplorer searchQuery={searchQuery} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App
