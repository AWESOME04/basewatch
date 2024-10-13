import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider } from './components/auth/WalletProvider';
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
          <Route path="/feed" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/maps" element={<ViewMap />} />
          <Route path="/report" element={<ReportActivity />} />
          <Route path="/post/:postId" element={<SinglePostPage />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;