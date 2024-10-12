import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import ViewMap from './pages/ViewMap';
import ReportActivity from './pages/ReportActivity';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/maps" element={<ViewMap />} />
        <Route path="/report" element={<ReportActivity />} />
      </Routes>
    </Router>
  );
}

export default App;