export interface UserInfo {
    address: string;
    balance: string;
    network: string;
    ens: string | null;
  }
  
  export interface ActivitySummary {
    reportsSubmitted: number;
    comments: number;
    likes: number;
  }
  
  export interface RecentActivity {
    description: string;
    date: string;
  }
  
  export interface ProfileData {
    userInfo: UserInfo;
    activitySummary: ActivitySummary;
    recentActivities: RecentActivity[];
  }