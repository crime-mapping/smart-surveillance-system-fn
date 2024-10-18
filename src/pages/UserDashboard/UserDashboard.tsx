import UserSideBar from "../../components/UserSideBar"
import React from 'react';
import Header from './Header';
import AnalyticsCards from './AnalyticsCards';
import CrimeDistributionChart from './CrimeDistributionChart';
import RecentCrime from "./RecentCrime";
import CrimeVarianceChart from "./CrimeVarianceChart";
import ErrorBoundary from "./ErrorBoundary";
import CrimeTrendsChart from "./CrimeTrendsChart";
import CrimeStatisticsSummary from "./CrimeStatisticsSummary";


const UserDashboard : React.FC = () => {
    return (
        <div className="w-[100vw]">
            <UserSideBar />
            <div className="w-[85%] ml-[15%] p-4">
                <Header />
                <main>
                  <AnalyticsCards />
                  <div className="grid grid-cols-3 gap-4">
                     <CrimeDistributionChart />
                     <CrimeStatisticsSummary />
                     <RecentCrime />
                  </div>
                  <div className="w-full">
                    <ErrorBoundary>
                      <CrimeVarianceChart />
                    </ErrorBoundary>
                  </div>
                  <CrimeTrendsChart />
                </main>
            </div>
        </div>
    )
}

export default UserDashboard;
