import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const CrimeHotspotMap:React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [showStatistics, setShowStatistics] = useState<boolean>(true);
  const crimeHotspots = [
    {
      location: [-1.9441, 30.0619],
      name: "Downtown Kigali",
      crimeCount: 25,
      severity: "high",
      description: "High concentration of theft and pickpocketing incidents",
      lastUpdated: "2024-03-15",
      crimeTypes: ["Theft", "Pickpocketing", "Vandalism"]
    },
    {
      location: [-1.9501, 30.0588],
      name: "Central Market Area",
      crimeCount: 20,
      severity: "medium",
      description: "Moderate level of reported incidents, mainly during peak hours",
      lastUpdated: "2024-03-14",
      crimeTypes: ["Shoplifting", "Fraud"]
    },
    {
      location: [-1.9521, 30.0648],
      name: "Nyabugogo Terminal",
      crimeCount: 10,
      severity: "low",
      description: "Occasional incidents reported during night hours",
      lastUpdated: "2024-03-13",
      crimeTypes: ["Theft", "Harassment"]
      },
     {
      location: [-1.9531, 30.0646],
      name: "Un sepecified Terminal",
      crimeCount: 8,
      severity: "high",
      description: "Occasional incidents reported during night hours",
      lastUpdated: "2024-03-13",
      crimeTypes: ["Theft", "Harassment"]
    }
    ];
    
  const navigate = useNavigate();  
  const goBackToDashboard=()=>{
      navigate("/user-dashboard");
  }

  const getColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#dc2626';
      case 'medium':
        return '#f97316';
      case 'low':
        return '#eab308';
      default:
        return '#dc2626';
    }
  };

  const getRadius = (count: number) => {
    return count * 20;
  };
  
    const filteredHotspots = selectedSeverity === 'all' 
    ? crimeHotspots 
    : crimeHotspots.filter(hotspot => hotspot.severity === selectedSeverity);

  const totalCrimes = crimeHotspots.reduce((sum, hotspot) => sum + hotspot.crimeCount, 0);
  const highRiskAreas = crimeHotspots.filter(hotspot => hotspot.severity === 'high').length;

  return (
    <div className="flex h-screen w-screen"> {/* Full screen container */}
      {/* Sidebar */}
      <div id="mapSidebar" className="w-65 text-white shadow-lg z-10  bg-primaryBackground overflow-y-auto">
        <div className="p-6">
          <Logo />
          <button className='w-10 h-10 flex mb-4 items-center text-center rounded-full border' onClick={goBackToDashboard}><FiArrowLeft className="w-full h-8" /></button>
          <h1 className="text-2xl font-bold mb-6">Crime Hotspots Map</h1>
          
          {/* Filters */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Filter by Severity</h2>
            <select 
              className="w-full p-2 border bg-primaryBackground rounded-lg"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
           {/* Statistics */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Statistics</h2>
              <button 
                onClick={() => setShowStatistics(!showStatistics)}
                className="text-white bg-primaryBackground px-4 py-1 rounded text-sm"
              >
                {showStatistics ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showStatistics && (
              <div className="space-y-3">
                <div className="bg-primaryBackground p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Total Reported Crimes</p>
                  <p className="text-2xl font-bold">{totalCrimes}</p>
                </div>
                <div className="bg-invertedPrimaryBackground p-3 rounded-lg">
                  <p className="text-sm text-gray-400">High Risk Areas</p>
                  <p className="text-2xl font-bold text-red-600">{highRiskAreas}</p>
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mb-6 text-white">
            <h2 className="text-lg font-semibold mb-3">Legend</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
                <span>High Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                <span>Low Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative"> {/* Relative positioning for map */}
        <MapContainer 
          center={[-1.9441, 30.0619]} 
          zoom={14} 
          style={{ height: '100%', width: '100%' }} // Explicit dimensions
          zoomControl={false}
          maxBounds={[
              [-2.015, 29.95], 
              [-1.875, 30.15]  
          ]}
        >
          <ZoomControl position="topright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredHotspots.map((hotspot, index) => (
            <Circle
              key={index}
              center={hotspot.location}
              radius={getRadius(hotspot.crimeCount)}
              pathOptions={{
                color: getColor(hotspot.severity),
                fillColor: getColor(hotspot.severity),
                fillOpacity: 0.5
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="text-lg font-bold mb-2">{hotspot.name}</h3>
                  <div className="space-y-2">
                    <p className="text-sm">{hotspot.description}</p>
                    <div className="border-t pt-2">
                      <p className="font-semibold">Crime Types:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {hotspot.crimeTypes.map((type, i) => (
                          <span 
                            key={i}
                            className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Reports: {hotspot.crimeCount}</span>
                      <span>Updated: {hotspot.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CrimeHotspotMap;