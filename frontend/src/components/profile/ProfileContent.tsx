import { useEffect, useState } from 'react';
import { useWallet } from '../auth/WalletProvider';
import { ethers } from 'ethers';
import { getMockProfileData } from '../../data/mockProfile';
import { ProfileData } from '../../interfaces/ProfileInterfaces';

const ProfileContent = () => {
  const { account } = useWallet();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (account && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(account);
        const network = await provider.getNetwork();
        let ens = null;
        try {
          ens = await provider.lookupAddress(account);
        } catch (error) {
          console.error("ENS lookup failed:", error);
        }

        // Merge real data with mock data
        const mockData = getMockProfileData(account);
        setProfileData({
          ...mockData,
          userInfo: {
            ...mockData.userInfo,
            address: account,
            balance: ethers.formatEther(balance),
            network: network.name,
            ens: ens,
          },
        });
      }
    };

    fetchProfileData();
  }, [account]);

  if (!profileData) {
    return null; 
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Account Information</h2>
          <p className="text-gray-600 mb-1"><span className="font-medium">Address:</span> {profileData.userInfo.address}</p>
          {profileData.userInfo.ens && <p className="text-gray-600 mb-1"><span className="font-medium">ENS Name:</span> {profileData.userInfo.ens}</p>}
          <p className="text-gray-600 mb-1"><span className="font-medium">Network:</span> {profileData.userInfo.network}</p>
          <p className="text-gray-600"><span className="font-medium">Balance:</span> {profileData.userInfo.balance} ETH</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Activity Summary</h2>
          <p className="text-gray-600 mb-1"><span className="font-medium">Reports Submitted:</span> {profileData.activitySummary.reportsSubmitted}</p>
          <p className="text-gray-600 mb-1"><span className="font-medium">Comments:</span> {profileData.activitySummary.comments}</p>
          <p className="text-gray-600"><span className="font-medium">Likes:</span> {profileData.activitySummary.likes}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <ul className="list-disc list-inside text-gray-600">
          {profileData.recentActivities.map((activity, index) => (
            <li key={index}>{activity.description} - {activity.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileContent;