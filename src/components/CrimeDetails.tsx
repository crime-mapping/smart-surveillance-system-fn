import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, MapPin, User, Camera, Download, Info } from "lucide-react";
import DashboardLayout from "../Layout/DashboardLayout";
import SingleCrimeSkeleton from "../skeletons/singleCrimeSkeleton";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import jsPDF from "jspdf";
// import logo from "../assets/real_logo.png";
import { FiArrowLeft } from "react-icons/fi";
import { cn } from "../lib/utils";
import html2canvas from "html2canvas";

export interface Location {
  location: string;
  description: string;
}

export interface ICrime {
  _id:string;
  crimeDescription?: string;
  crimeType: string;
  crimeLocation: Location;
  dateOfOccurrence: Date;
  emergencyLevel: string;
  supportingImage?: string;
}

// Atoms/Molecules
const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; className?: string }> = ({ icon, title, children, className }) => (
  <section className={cn("mb-6", className)}>
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <h4 className="text-lg font-semibold tracking-tight">{title}</h4>
    </div>
    <div>{children}</div>
  </section>
);

const InfoRow: React.FC<{ icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ icon, children, className }) => (
  <div className={cn("flex items-center text-sm text-[var(--text-color)] dark:text-gray-400 mb-2", className)}>
    {icon}
    {children}
  </div>
);

const SeverityBadge: React.FC<{ level?: string }> = ({ level }) => (
  <span
    className={cn(
      "text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm border",
      level === "HIGH"
        ? "bg-red-100 text-red-700 border-red-300"
        : level === "MEDIUM"
          ? "bg-yellow-100 text-yellow-700 border-yellow-300"
          : "bg-green-100 text-green-700 border-green-300"
    )}
    aria-label={`Severity Level: ${level}`}
  >
    {level}
  </span>
);

const EvidenceModal: React.FC<{ image?: string; open: boolean; onClose: () => void }> = ({ image, open, onClose }) => (
  open && image ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <img
        src={image}
        alt="Evidence Large"
        className="max-w-full max-h-[80vh] rounded-lg border-4 border-white shadow-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      />
    </div>
  ) : null
);



const CrimeDetails: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [crime, setCrime] = useState<ICrime>();
  const [evidenceOpen, setEvidenceOpen] = useState(false);
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
  }, [id]);

const reportRef = useRef<HTMLDivElement>(null);

const handleDownload = async () => {
  if (!reportRef.current) return;

  const canvas = await html2canvas(reportRef.current, {
    scale: 2,
    useCORS: true, // For external images like logo
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`crime_report_${id}.pdf`);
};

  return (
    <DashboardLayout>
      {loading ? (
        <SingleCrimeSkeleton />
      ) : (
        <div  ref={reportRef}
          className={cn(
            "relative mt-6 p-6 my-4 text-[var(--text-color)] rounded-lg max-w-5xl mx-auto border transition-all duration-300",

          )}
        >
          {/* Floating Download Button (mobile) */}
          <button
            onClick={handleDownload}
            className="fixed bottom-6 right-6 z-40 flex md:hidden items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-5 py-3 rounded-full shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Download crime report as PDF"
          >
            <Download className="w-5 h-5" />
          </button>

          {/* Back Button */}
          <button
            onClick={() => navigate("/reports")}
            className="print:hidden flex items-center text-blue-600 text-lg hover:underline mb-4 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Back to Reports"
          >
            <FiArrowLeft className="mr-2" /> Back to Reports
          </button>
           <div className="hidden print:block mb-4">
        <h2 className="text-xl font-semibold">Crime Report Summary #{crime?._id}</h2>
        <p>Generated on: {new Date().toLocaleDateString()}</p>
      </div>

          {/* Header: Crime Type & Severity */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6 border-b pb-4 border-blue-200 dark:border-blue-900">
            <div className="flex items-center gap-3">
              <Info className="w-7 h-7 text-blue-500" />
              <h2 className="text-2xl font-bold tracking-tight">{crime?.crimeType}</h2>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-1">Severity Level:</span>
              <SeverityBadge level={crime?.emergencyLevel} />
            </div>
          </div>

          {/* Date & Location */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <InfoRow icon={<CalendarDays className="w-5 h-5 mr-2 text-blue-400" />}>{formatDate(crime?.dateOfOccurrence)}</InfoRow>
            <InfoRow icon={<MapPin className="w-5 h-5 mr-2 text-blue-400" />}>{crime?.crimeLocation?.location}, Kigali</InfoRow>
          </div>

          {/* Description */}
          {crime?.crimeDescription && (
            <Section icon={<Info className="w-5 h-5 text-blue-400" />} title="Description">
              <p className="text-base text-[var(--text-color)] leading-relaxed">
                {crime.crimeDescription}
              </p>
            </Section>
          )}

          {/* Suspect Info */}
          <Section icon={<User className="w-5 h-5 text-blue-400" />} title="Suspect Information">
            <div className="flex items-center text-base text-[var(--text-color)]">
              Male, approx. 30–40 years old, 6ft tall
            </div>
          </Section>

          {/* Evidence */}
          <Section icon={<Camera className="w-5 h-5 text-blue-400" />} title="Evidence">
            {crime?.supportingImage ? (
              <>
                <div className="flex items-center text-sm text-[var(--text-color)] mb-2">
                  <Camera className="w-5 h-5 mr-2" /> Photo evidence attached
                </div>
                <img
                  src={crime.supportingImage}
                  alt="Evidence"
                  className="rounded-lg border w-full max-h-[400px] object-cover shadow-md cursor-pointer transition hover:scale-105"
                  onClick={() => setEvidenceOpen(true)}
                  tabIndex={0}
                  aria-label="View evidence larger"
                />
                <EvidenceModal image={crime.supportingImage} open={evidenceOpen} onClose={() => setEvidenceOpen(false)} />
              </>
            ) : (
              <p className="italic text-red-500">No evidence provided</p>
            )}
          </Section>

          {/* Download Button (desktop) */}
          <div className="print:hidden hidden md:flex justify-end mt-8">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-6 py-3 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Download crime report as PDF"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CrimeDetails;
