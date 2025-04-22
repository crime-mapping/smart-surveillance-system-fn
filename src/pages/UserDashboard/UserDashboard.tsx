import React from "react";
import AnalyticsCards from "./AnalyticsCards";
import CrimeDistributionChart from "./CrimeDistributionChart";
import RecentCrime from "./RecentCrime";
import CrimeVarianceChart from "./CrimeVarianceChart";
import ErrorBoundary from "./ErrorBoundary";
import CrimeTrendsChart from "./CrimeTrendsChart";
import CrimeStatisticsSummary from "./CrimeStatisticsSummary";
import DashboardLayout from "../../Layout/DashboardLayout";
import { useCrimeDashboardData } from "../../utils/useCrimeDashboardData";
import DashboardSkeleton from "../../skeletons/DashboardSkeleton";

const UserDashboard: React.FC = () => {
  const { data, loading } = useCrimeDashboardData();
  return (
    <DashboardLayout>
      {loading || !data ? (
        <DashboardSkeleton />
      ) : (
        <main>
          <AnalyticsCards
            totalCrimes={data.totalCrimes}
            crimeRate={data.crimeRate}
            crimeRateChange={data.crimeRateChange}
            totalCrimesChange={data.totalCrimesChange}
            mostPopularCrime={data.mostPopularCrime}
            topLocation={data.mostAffectedLocation}
            change={data.crimeRateChange}
          />
          <div className="grid grid-cols-3 gap-4">
            <CrimeDistributionChart distribution={data.crimeDistribution} />
            <CrimeStatisticsSummary
              total={data.totalCrimes}
              mostCommonType={data.mostCommonCrimeType}
              topLocation={data.mostAffectedLocation}
              emergencyDistribution={data.emergencyDistribution}
            />
            <RecentCrime recent={data.recentCrime} />
          </div>
          <div className="w-full">
            <ErrorBoundary>
              <CrimeVarianceChart monthlyData={data.monthlyCrimes} />
            </ErrorBoundary>
          </div>
          <CrimeTrendsChart trendData={data.monthlyCrimes} />
        </main>
      )}
    </DashboardLayout>
  );
};

export default UserDashboard;
