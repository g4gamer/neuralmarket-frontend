import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme , Box} from '@chakra-ui/react';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import CompanyAnalysisPage from './pages/dashboard/CompanyAnalysisPage';
import SentimentAnalysisPage from './pages/dashboard/SentimentAnalysisPage';
import NewsFeedPage from './pages/news/NewsFeedPage';
import WatchlistPage from './pages/dashboard/WatchList';



// Create a theme
const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      500: '#10B981', // Primary green
      600: '#059669',
      700: '#047857',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />            
            <Route path="companies" element={<CompanyAnalysisPage />} />
            <Route path="news" element={<NewsFeedPage />} />
            <Route path="sentiment" element={<SentimentAnalysisPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;