import { useLocation } from 'react-router-dom';
import Header from '../components/shared/Header';
import Sidebar from '../components/shared/Sidebar';
import ReportForm from '../components/report/ReportForm';

const ReportActivity = () => {
  const location = useLocation();

  return (
    <div className="pt-24 min-h-screen bg-gray-100">
      <Header mode="dashboard" isHomePage={false} />
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <Sidebar activePage={location.pathname} />
          </div>
          <main className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-light-blue">Report Illegal Activity</h1>
            <ReportForm />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ReportActivity;