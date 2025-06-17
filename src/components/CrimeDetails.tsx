import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, MapPin, User, Camera, Download } from "lucide-react";
import DashboardLayout from "../Layout/DashboardLayout";
import SingleCrimeSkeleton from "../skeletons/singleCrimeSkeleton";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import jsPDF from "jspdf";
import logo from "../assets/real_logo.png";
import { FiArrowLeft } from "react-icons/fi";

export interface Location {
  location: string;
  description: string;
}

export interface ICrime {
  crimeDescription?: string;
  crimeType: string;
  crimeLocation: Location;
  dateOfOccurrence: Date;
  emergencyLevel: string;
  supportingImage?: string;
}

// ... imports remain the same

const CrimeDetails: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [crime, setCrime] = useState<ICrime>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleCrime = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/crimes/${id}`, {
          withCredentials: true,
        });
        setCrime(response.data);
      } catch (err: any) {
        toast.error(
          err?.response?.data?.error || "Failed to retrieve single crime"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCrime();
  }, []);

  const getBase64FromUrl = async (url: string): Promise<string> => {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleDownload = async () => {
    const doc = new jsPDF();
    const base64Logo = await getBase64FromUrl(logo);
    doc.addImage(base64Logo, "PNG", 160, 10, 35, 15);
    doc.setFontSize(16);
    doc.text("Crime Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Crime ID: ${id}`, 20, 30);
    doc.text(`Type: ${crime?.crimeType || "-"}`, 20, 40);
    doc.text(`Date: ${formatDate(crime?.dateOfOccurrence)}`, 20, 50);
    doc.text(`Location: ${crime?.crimeLocation?.location || "-"}`, 20, 60);

    if (crime?.crimeDescription) {
      doc.text("Description:", 20, 70);
      doc.text(doc.splitTextToSize(crime.crimeDescription, 170), 20, 78);
    }

    doc.text(`Suspect Info: Male, approx. 30–40 years old, 6ft tall`, 20, 100);
    doc.text(`Evidence: 1 photo (if attached)`, 20, 110);

    doc.save(`crime_report_${id}.pdf`);
  };

  return (
    <DashboardLayout>
      {loading ? (
        <SingleCrimeSkeleton />
      ) : (
        <div className="mt-24 p-6 my-4 bg-[var(--card-bg)] text-[var(--text-color)] shadow-md rounded-xl max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/reports")}
            className="flex items-center text-blue-600 text-lg hover:underline mb-4"
          >
            <FiArrowLeft className="mr-2" /> Back to Reports
          </button>

          <h2 className="text-3xl font-bold text-center mb-6">
            Crime Report # ...{id?.substring(12)}
          </h2>

          {/* Crime Type and Status */}
          <div className="flex items-center justify-between flex-wrap mb-4">
            <h3 className="text-xl font-semibold">{crime?.crimeType}</h3>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                crime?.emergencyLevel === "HIGH"
                  ? "bg-red-100 text-red-700"
                  : crime?.emergencyLevel === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {crime?.emergencyLevel}
            </span>
          </div>

          {/* Date and Location */}
          <div className="flex items-center text-sm text-[var(--text-color)] dark:text-gray-400 mb-3">
            <CalendarDays className="w-5 h-5 mr-2" />
            {formatDate(crime?.dateOfOccurrence)}
          </div>
          <div className="flex items-center text-sm text-[var(--text-color)] dark:text-gray-400 mb-6">
            <MapPin className="w-5 h-5 mr-2" />
            {crime?.crimeLocation?.location}, Kigali
          </div>

          {/* Description */}
          {crime?.crimeDescription && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-1">Description</h4>
              <p className="text-sm text-[var(--text-color)]">
                {crime.crimeDescription}
              </p>
            </div>
          )}

          {/* Suspect Info */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-1">Suspect Information</h3>
            <div className="flex items-center text-sm text-[var(--text-color)]">
              <User className="w-5 h-5 mr-2" />
              Male, approx. 30–40 years old, 6ft tall
            </div>
          </div>

          {/* Evidence */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-1">Evidence</h3>
            {crime?.supportingImage ? (
              <>
                <div className="flex items-center text-sm text-[var(--text-color)] mb-2">
                  <Camera className="w-5 h-5 mr-2" /> Photo evidence attached
                </div>
                <img
                  src={crime.supportingImage}
                  alt="Evidence"
                  className="rounded-lg border w-full max-h-[400px] object-cover shadow-md"
                />
              </>
            ) : (
              <p className="italic text-red-500">No evidence provided</p>
            )}
          </div>

          {/* Download Button */}
          <div className="flex justify-end">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-primaryGradientStart hover:bg-primaryGradientEnd text-white px-5 py-2 rounded-md shadow transition"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CrimeDetails;
