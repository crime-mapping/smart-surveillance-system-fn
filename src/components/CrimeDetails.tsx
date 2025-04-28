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
    doc.text(`Evidence: 2 photos taken`, 20, 110);

    doc.save(`crime_report_${id}.pdf`);
  };

  return (
    <DashboardLayout>
      {loading ? (
        <SingleCrimeSkeleton />
      ) : (
        <div className="mt-24 p-6 my-4 bg-white shadow rounded-md">
          <span
            onClick={() => {
              navigate("/reports");
            }}
            className="cursor-pointer rounded-md"
          >
            <FiArrowLeft className="w-16 h-10" />
          </span>
          <h2 className="text-center text-2xl font-bold mb-4">
            Single Crime Report Details
          </h2>
          <h3 className="text-xl font-semibold">
            Crime Report <span className="italic">#{id}</span>
          </h3>

          <div className="bg-red-600 text-white px-4 py-2 rounded shadow mt-2 mb-4 w-fit">
            {crime?.crimeType}
          </div>

          <div className="flex items-center text-gray-700 mb-2">
            <CalendarDays className="w-5 h-5 mr-2" />
            {formatDate(crime?.dateOfOccurrence)}
          </div>

          <div className="flex items-center text-gray-700 mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="mr-2"> {crime?.crimeLocation?.location} </span>
            KK 230 St, Kigali
          </div>
          {crime?.crimeDescription && (
            <div className="mb-4">
              <h4 className="font-semibold">Description</h4>
              <p className="text-gray-600">{crime?.crimeDescription}</p>
            </div>
          )}

          <div className="mb-4">
            <h4 className="font-semibold">Suspect Information</h4>
            <div className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-2" />
              Male, approx. 30–40 years old, 6ft tall
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Evidences</h4>
            <div className="flex items-center text-gray-700">
              <Camera className="w-5 h-5 mr-2" />2 photos taken
            </div>
          </div>

          <button
            onClick={() => {
              handleDownload();
            }}
            className="flex items-center justify-center gap-2 bg-primaryBackground  text-white px-4 py-2 rounded shadow hover:bg-gray-900"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CrimeDetails;
