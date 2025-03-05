import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ImageExplorer } from './components/image-explorer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen pt-24 w-full flex justify-center">
        <ImageExplorer />
      </div>
    </QueryClientProvider>
  );
}

export default App
