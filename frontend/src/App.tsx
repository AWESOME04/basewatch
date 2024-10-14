import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider } from './components/auth/WalletProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import ViewMap from './pages/ViewMap';
import ReportActivity from './pages/ReportActivity';
import SinglePostPage from './pages/SinglePostPage';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
          <Route path="/maps" element={<ProtectedRoute><ViewMap /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><ReportActivity /></ProtectedRoute>} />
          <Route path="/post/:postId" element={<ProtectedRoute><SinglePostPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;