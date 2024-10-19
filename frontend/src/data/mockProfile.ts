import { ethers } from 'ethers';
import { ProfileData } from '../interfaces/ProfileInterfaces';

export const getMockProfileData = (address: string): ProfileData => ({
  userInfo: {
    address: address,
    balance: ethers.parseEther("1.5").toString(), // 1.5 ETH
    network: "Mainnet",
    ens: "user.eth",
  },
  activitySummary: {
    reportsSubmitted: 5,
    comments: 12,
    likes: 34,
  },
  recentActivities: [
    { description: "Reported illegal mining activity in Ashanti Region", date: "2024-10-15" },
    { description: "Commented on water pollution report in Accra", date: "2024-10-14" },
    { description: "Liked a post about community clean-up initiative", date: "2024-10-13" },
  ],
});