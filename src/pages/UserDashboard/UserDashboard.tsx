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
      <div className="min-h-screen dark:bg-slate-900 mt-6 rounded-lg">
        {loading || !data ? (
          <DashboardSkeleton />
        ) : (
          <div className="space-y-2">
            {/* Analytics Cards */}
            <AnalyticsCards
              totalCrimes={data?.totalCrimes}
              monthlyCrimes={data?.monthlyCrimes}
              crimeRate={data?.crimeRate}
              crimeRateChange={data?.crimeRateChange}
              totalCrimesChange={data?.totalCrimesChange}
              mostPopularCrime={data?.mostPopularCrime}
              topLocation={data?.mostAffectedLocation}
              change={data?.crimeRateChange}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <CrimeDistributionChart distribution={data.crimeDistribution} />
              <CrimeStatisticsSummary
                total={data?.totalCrimes}
                mostCommonType={data?.mostCommonCrimeType}
                topLocation={data?.mostAffectedLocation}
                emergencyDistribution={data?.emergencyDistribution}
              />
              <RecentCrime recent={data?.recentCrime} />
            </div>

            {/* Charts Section */}
            <div className="space-y-6">
              <ErrorBoundary>
                <CrimeVarianceChart monthlyData={data?.monthlyCrimes} />
              </ErrorBoundary>
              <ErrorBoundary>
                <CrimeTrendsChart trendData={data?.monthlyCrimes} />
              </ErrorBoundary>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
