import React, { Suspense, lazy } from 'react';
import DashboardLayout from '../components/shared/DashboardLayout';
import { useWallet } from '../components/auth/WalletProvider';
import Loading from '../components/shared/Loading';

const ProfileContent = lazy(() => import('../components/profile/ProfileContent'));

const Profile: React.FC = () => {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return <div>Please connect your wallet to view your profile.</div>;
  }

  return (
    <DashboardLayout title="Your Profile">
      <Suspense fallback={<Loading />}>
        <ProfileContent />
      </Suspense>
    </DashboardLayout>
  );
};

export default Profile;