import { ArrowRight, ChevronUp, Menu } from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaCamera,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaUserShield,
  FaChartBar,
  FaRobot,
} from "react-icons/fa";
import { ShieldCheck, MapPin, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import homeImg from "../assets/homeImg.png";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { motion } from "framer-motion";
import { useState } from "react";

const icons = [
  <FaCamera size={30} color="text-[var(--text-color)]" />, // Surveillance
  <FaMapMarkedAlt size={30} color="text-[var(--text-color)]" />, // Mapping
  <FaShieldAlt size={30} color="text-[var(--text-color)]" />, // Protection
  <FaUserShield size={30} color="text-[var(--text-color)]" />, // Safety
  <FaChartBar size={30} color="text-[var(--text-color)]" />, // Analytics
  <FaRobot size={30} color="text-[var(--text-color)]" />, // AI
];

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--card-bg)] w-full  text-[var(--text-color)] min-h-screen overflow-x-hidden">
      <header className="flex justify-between items-center p-6 md:p-10 relative z-10">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-lg">
          <ThemeToggle />
          <a href="#about" className="hover:text-purple-400">
            About Us
          </a>
          <a href="#contact" className="hover:text-purple-400">
            Contact Us
          </a>
          <Link
            to="/login"
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
          >
            Login
          </Link>
        </nav>
        <div className="md:hidden z-20">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="text-[var(--text-color)]" />
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-20 right-6 bg-[var(--card-bg)] border rounded shadow-md p-4 space-y-4 text-right">
            <a href="#about" className="block hover:text-purple-400">
              About Us
            </a>
            <a href="#contact" className="block hover:text-purple-400">
              Contact Us
            </a>
            <Link
              to="/login"
              className="block px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              Login
            </Link>
          </div>
        )}
      </header>

      <section className="px-6 py-16 flex flex-col md:flex-row items-center gap-20 relative overflow-hidden">
        <motion.div
          className="md:w-1/2 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Building a Safer Kigali Together
          </h1>
          <p className="text-xl mb-6 text-[var(--text-color)]">
            Smart surveillance and AI-driven crime mapping in real-time.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 text-white px-6 py-3 rounded-full flex items-center hover:bg-purple-700"
          >
            Get Started <ArrowRight className="ml-2" />
          </button>
        </motion.div>

        <motion.div className="relative w-[280px] h-[280px] flex items-center justify-center z-10">
          <div className="absolute w-full h-full rounded-full border-2  animate-spin-slow"></div>
          {icons.map((icon, i) => (
            <motion.div
              key={i}
              className={`absolute w-12 h-12  animate-float${i}`}
            >
              {icon}
            </motion.div>
          ))}
          <img
            src={homeImg}
            alt="Surveillance"
            className="w-[180px] h-[180px] rounded-full shadow-lg z-10"
          />
        </motion.div>
        {/* Background floating shapes */}
        <motion.div className="absolute top-[-50px] right-[-80px] w-[200px] h-[200px] bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></motion.div>
        <motion.div className="absolute bottom-[-60px] left-[-60px] w-[150px] h-[150px] bg-indigo-200 rounded-full blur-2xl opacity-25 animate-ping"></motion.div>
      </section>
      <style>
        {`
          @keyframes float0 { 0% { transform: rotate(0deg) translateX(120px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); } }
          @keyframes float1 { 0% { transform: rotate(60deg) translateX(120px) rotate(-60deg); } 100% { transform: rotate(420deg) translateX(120px) rotate(-420deg); } }
          @keyframes float2 { 0% { transform: rotate(120deg) translateX(120px) rotate(-120deg); } 100% { transform: rotate(480deg) translateX(120px) rotate(-480deg); } }
          @keyframes float3 { 0% { transform: rotate(180deg) translateX(120px) rotate(-180deg); } 100% { transform: rotate(540deg) translateX(120px) rotate(-540deg); } }
          @keyframes float4 { 0% { transform: rotate(240deg) translateX(120px) rotate(-240deg); } 100% { transform: rotate(600deg) translateX(120px) rotate(-600deg); } }
          @keyframes float5 { 0% { transform: rotate(300deg) translateX(120px) rotate(-300deg); } 100% { transform: rotate(660deg) translateX(120px) rotate(-660deg); } }

          .animate-float0 { animation: float0 12s linear infinite; }
          .animate-float1 { animation: float1 12s linear infinite; }
          .animate-float2 { animation: float2 12s linear infinite; }
          .animate-float3 { animation: float3 12s linear infinite; }
          .animate-float4 { animation: float4 12s linear infinite; }
          .animate-float5 { animation: float5 12s linear infinite; }
          .animate-wave {
            animation: wave 12s ease-in-out infinite;
            background-size: 200% 200%;
          }
        `}
      </style>

      {/* Crime Analytics Cards */}
      <section className="px-6 py-16 bg-[var(--card-bg)] text-[var(--text-color)]">
        <h2 className="text-4xl font-bold text-center mb-10">
          Crime Reports Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <motion.div
            className="p-6 rounded-xl shadow bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-4xl font-bold">312</h3>
            <p className="mt-2">Reports in Last 30 Days</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-xl shadow bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-4xl font-bold">25%</h3>
            <p className="mt-2">Increase from Last Month</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-xl shadow bg-gradient-to-r from-green-400 to-teal-500 text-white"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-4xl font-bold">12</h3>
            <p className="mt-2">Crime Hotspots Identified</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-xl shadow bg-gradient-to-r from-red-400 to-pink-500 text-white"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-4xl font-bold">6 min</h3>
            <p className="mt-2">Avg. Response Time</p>
          </motion.div>
        </div>
      </section>
      <section className="px-6 py-24 text-[var(--text-color)] text-center relative z-10 bg-gradient-to-br from-[var(--card-bg)] via-purple-100/10 to-[var(--card-bg)] dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="max-w-4xl mx-auto">
          <p className="uppercase text-sm tracking-widest text-purple-600 dark:text-purple-400 mb-2">
            Introducing Next-Gen Surveillance
          </p>
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Empowering Kigali Through Smart Crime Detection
          </h2>
          <p className="text-lg mb-10">
            Join our mission to transform city safety. Our AI-powered platform
            uses real-time camera feeds and data analysis to prevent, detect,
            and respond to crime more efficiently than ever.
          </p>
          <div className="flex justify-center gap-6">
            <button className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium">
              Learn More
            </button>
            <button className="px-6 py-3 rounded-full bg-white text-purple-700 hover:bg-gray-100 font-medium dark:bg-slate-800 dark:text-purple-300 dark:hover:bg-slate-700">
              Request a Demo
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-16 text-[var(--text-color)]">
        <div className="mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">About CM&3S</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            The Crime Mapping and Smart Surveillance System is Kigali’s
            innovative step toward proactive urban safety. Using AI, live data
            feeds, and machine learning models, we empower both communities and
            law enforcement to take action before crimes happen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-[var(--card-bg)] p-6 rounded-lg shadow">
              <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-bold text-xl mb-2">Proactive Security</h3>
              <p>
                We use predictive analytics to detect patterns and prevent
                crimes in hotspots.
              </p>
            </div>
            <div className="bg-[var(--card-bg)] p-6 rounded-lg shadow">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <h3 className="font-bold text-xl mb-2">Live Crime Mapping</h3>
              <p>
                Track real-time events and alerts across neighborhoods in
                Kigali.
              </p>
            </div>
            <div className="bg-[var(--card-bg)] p-6 rounded-lg shadow">
              <Clock className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-bold text-xl mb-2">Faster Response</h3>
              <p>
                Our system reduces average police response time with smart
                routing and alerts.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="px-6 py-24 text-[var(--text-color)] bg-[var(--card-bg)]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="mb-8">
            Have questions or need a demo? Reach out to us directly.
          </p>
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="flex-1 p-3 rounded border bg-transparent"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 p-3 rounded border bg-transparent"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full p-3 rounded border bg-transparent"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Send Message
            </button>
          </form>
          {/* Back to top button */}
          <button className="bg-purple-600 text-white p-2 mt-12 rounded-full shadow hover:bg-purple-800 z-50">
            <a href="#">
              <ChevronUp />
            </a>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-[var(--card-bg)] text-[var(--text-color)] border-t-2 py-8"
      >
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-xl font-bold mb-4">Stay Connected</h4>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="hover:text-purple-400">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-purple-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-purple-400">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="hover:text-purple-400">
              <FaInstagram size={24} />
            </a>
          </div>
          <p className="text-sm">
            &copy; 2025 CMSS - Crime Mapping & Smart Surveillance. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
