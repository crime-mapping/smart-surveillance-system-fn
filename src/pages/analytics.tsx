import StackedBarChart from "../components/StackedBarChart";
import DashboardLayout from "../Layout/DashboardLayout";
import HotspotFrequencyChart from "../components/HotspotFrequencyChart";
import CrimeLocationPieChart from "../components/CrimeLocationPieChart";

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="p-6 bg-[var(--card-bg)] text-[var(--text-color)] shadow p-8 mt-20 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Monthly Crime Breakdown</h2>
        <>
          <StackedBarChart />
          <div className="mt-10 flex flex-row gap-24">
            <HotspotFrequencyChart />
            <CrimeLocationPieChart />
          </div>
        </>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
