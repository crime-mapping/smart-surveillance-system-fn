import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import DashboardLayout from "../Layout/DashboardLayout";
import CrimeReportsSkeleton from "../skeletons/CrimeReportsSkeleton";
import CrimeCard from "../components/CrimeCard";
import { Search, Filter, Calendar, MapPin, AlertTriangle, TrendingUp } from "lucide-react";

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

  const getCrimeStats = () => {
    const highPriority = crimes.filter(crime => crime.emergencyLevel === 'HIGH').length;
    const mediumPriority = crimes.filter(crime => crime.emergencyLevel === 'MEDIUM').length;
    const lowPriority = crimes.filter(crime => crime.emergencyLevel === 'LOW').length;
    const totalCrimes = crimes.length;

    return { highPriority, mediumPriority, lowPriority, totalCrimes };
  };

  const stats = getCrimeStats();

  return (
    <DashboardLayout>
      {loading ? (
        <CrimeReportsSkeleton />
      ) : (
        <div className="min-h-screen p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="text-red-600 h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Crime Reports</h1>
                    <p className="text-gray-600">Monitor and analyze crime incidents across all locations</p>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="text-red-600 h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">High Priority</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.highPriority}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <AlertTriangle className="text-yellow-600 h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Medium Priority</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.mediumPriority}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <AlertTriangle className="text-green-600 h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Low Priority</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.lowPriority}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <TrendingUp className="text-blue-600 h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Total Reports</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.totalCrimes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search crimes by type or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "recent", label: "Recent Crimes", icon: TrendingUp },
                    { key: "all", label: "All Crimes", icon: AlertTriangle },
                    { key: "filter-level", label: "Filter by Level", icon: Filter },
                    { key: "filter-location", label: "Filter by Location", icon: MapPin },
                    { key: "filter-date", label: "Filter by Date", icon: Calendar },
                  ].map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.key}
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === item.key
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        onClick={() => setTab(item.key)}
                      >
                        <IconComponent className="h-4 w-4 mr-2" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Filters */}
              {tab === "filter-location" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                  >
                    <option value="all">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc._id} value={loc._id}>
                        {loc.location}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {tab === "filter-level" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Priority Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                  >
                    <option value="all">All Levels</option>
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="LOW">Low Priority</option>
                  </select>
                </div>
              )}

              {tab === "filter-date" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredCrimes.length === 0
                    ? "No crime reports found"
                    : `Showing ${filteredCrimes.length} crime report${filteredCrimes.length !== 1 ? 's' : ''}`
                  }
                </h2>
                {filteredCrimes.length > 0 && (
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Low</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Crime Cards Grid */}
            {currentCrimes.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No crime reports found</h3>
                <p className="text-gray-500">
                  {searchQuery || tab !== "all"
                    ? "Try adjusting your search criteria or filters"
                    : "No crime reports have been recorded yet"
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCrimes.map((crime) => (
                  <CrimeCard key={crime._id} crime={crime} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {indexOfFirstCrime + 1} to {Math.min(indexOfLastCrime, filteredCrimes.length)} of {filteredCrimes.length} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CrimeReports;
