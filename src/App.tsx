import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ImageExplorer } from './components/image-explorer';
import { ImageFilter } from './components/image-filter';

const queryClient = new QueryClient();

function AppContent() {
  return (
    <div className="min-h-screen w-full">
      <ImageFilter />
      <div className="pt-24 flex justify-center">
        <ImageExplorer />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
