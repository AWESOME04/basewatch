import { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/shared/Header';
import Sidebar from '../components/shared/Sidebar';
import { useWallet } from '../components/auth/WalletProvider';
import Loading from '../components/shared/Loading';

const ProfileContent = lazy(() => import('../components/profile/ProfileContent'));

const Profile = () => {
  const location = useLocation();
  const { isConnected } = useWallet();

  if (!isConnected) {
    return <div>Please connect your wallet to view your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className='pt-4'>
        <Header mode="dashboard" isHomePage={false} />
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-20 lg:pt-24">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <Sidebar activePage={location.pathname} />
          </div>
          <main className="w-full lg:flex-grow mb-8">
            <h1 className="text-2xl font-bold mb-6 text-light-blue">Your Profile</h1>
            <Suspense fallback={<Loading />}>
              <ProfileContent />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;