import StackedBarChart from "../components/StackedBarChart";
import DashboardLayout from "../Layout/DashboardLayout";
import HotspotFrequencyChart from "../components/HotspotFrequencyChart";
import CrimeLocationPieChart from "../components/CrimeLocationPieChart";

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="p-4 bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg mt-2">
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
