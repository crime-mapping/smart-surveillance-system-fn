import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import DashboardLayout from "../Layout/DashboardLayout";
import CrimeReportsSkeleton from "../skeletons/CrimeReportsSkeleton";
import CrimeCard from "../components/CrimeCard";

interface ICrime {
  _id: string;
  crimeType: string;
  dateOfOccurrence: string;
  emergencyLevel: string;
  crimeLocation: {
    _id: string;
    location: string;
  };
}

interface ILocation {
  _id: string;
  location: string;
}

const ITEMS_PER_PAGE = 9;

const CrimeReports: React.FC = () => {
  const [crimes, setCrimes] = useState<ICrime[]>([]);
  const [filteredCrimes, setFilteredCrimes] = useState<ICrime[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [tab, setTab] = useState("recent");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCrimes();
    fetchLocations();
  }, []);

  const fetchCrimes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/crimes", { withCredentials: true });
      setCrimes(res.data);
      setFilteredCrimes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/locations", { withCredentials: true });
      setLocations(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterCrimes = () => {
    let data = [...crimes];

    if (tab === "recent") {
      data = crimes.slice(0, 10);
    }
    if (tab === "filter-location" && selectedLocation !== "all") {
      data = crimes.filter((crime) => {
        return crime.crimeLocation?._id === selectedLocation;
      });
    }
    if (tab === "filter-level" && selectedLevel !== "all") {
      data = crimes.filter((crime) => crime.emergencyLevel === selectedLevel);
    }
    if (tab === "filter-date" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      data = crimes.filter((crime) => {
        const crimeDate = new Date(crime.dateOfOccurrence);
        return crimeDate >= start && crimeDate <= end;
      });
    }
    if (searchQuery.trim()) {
      data = data.filter((crime) =>
        (crime.crimeType + " " + crime.crimeLocation?.location)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCrimes(data);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterCrimes();
  }, [
    tab,
    selectedLocation,
    selectedLevel,
    searchQuery,
    crimes,
    startDate,
    endDate,
  ]);

  const indexOfLastCrime = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCrime = indexOfLastCrime - ITEMS_PER_PAGE;
  const currentCrimes = filteredCrimes.slice(
    indexOfFirstCrime,
    indexOfLastCrime
  );

  const totalPages = Math.ceil(filteredCrimes.length / ITEMS_PER_PAGE);

  return (
    <DashboardLayout>
      {loading ? (
        <CrimeReportsSkeleton />
      ) : (
        <div className="py-8 mt-20">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Crime Reports</h1>
            {/* Legend */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-red-600 rounded" /> High
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-yellow-500 rounded" /> Medium
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-green-500 rounded" /> Low
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search crimes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border bg-[var(--card-bg)] px-3 py-2 rounded w-full md:w-1/3"
            />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Tabs Buttons */}
            {[
              "recent",
              "all",
              "filter-level",
              "filter-location",
              "filter-date",
            ].map((item) => (
              <button
                key={item}
                className={`px-4 py-2 rounded ${
                  tab === item
                    ? "bg-blue-300 text-white"
                    : "bg-[var(--card-bg)]"
                }`}
                onClick={() => setTab(item)}
              >
                {item === "recent"
                  ? "Recent Crimes"
                  : item === "all"
                  ? "All Crimes"
                  : item === "filter-level"
                  ? "Filter by Level"
                  : item === "filter-location"
                  ? "Filter by Location"
                  : "Filter by Date"}
              </button>
            ))}
          </div>

          {/* Filters */}
          {tab === "filter-location" && (
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border bg-[var(--card-bg)] px-3 py-2 rounded mb-6"
            >
              <option value="all">All Locations</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc._id}>
                  {loc.location}
                </option>
              ))}
            </select>
          )}
          {tab === "filter-level" && (
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border bg-[var(--card-bg)] px-3 py-2 rounded mb-6"
            >
              <option value="all">All Levels</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          )}
          {tab === "filter-date" && (
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div>
                <label className="block  text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border bg-[var(--card-bg)] px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block  text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border bg-[var(--card-bg)] px-3 py-2 rounded"
                />
              </div>
            </div>
          )}

          {/* Crime Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCrimes.length === 0 ? (
              <p>No crime reports found.</p>
            ) : (
              currentCrimes.map((crime) => (
                <CrimeCard key={crime._id} crime={crime} />
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-[var(--card-bg)] hover:bg-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-[var(--card-bg)] hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CrimeReports;
