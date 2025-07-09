import { ArrowRight, Menu, X, Shield, Camera, MapPin, Bell, BarChart3, Zap, CheckCircle, Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { motion } from "framer-motion";
import { useState } from "react";


const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "AI-Powered Video Analysis",
      description: "Real-time analysis of surveillance feeds with advanced ML algorithms detecting suspicious activities within seconds."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Predictive Crime Mapping",
      description: "Dynamic crime hotspot identification using historical data and predictive modeling for proactive law enforcement."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Instant Alerts",
      description: "Immediate notifications to law enforcement with video clips, timestamps, and precise location data."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive crime pattern analysis with interactive dashboards for data-driven decision making."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "End-to-end encryption, role-based access control, and full compliance with privacy regulations."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Processing",
      description: "Sub-minute response times with scalable infrastructure supporting multiple concurrent video feeds."
    }
  ];

  const stats = [
    { value: "< 1 min", label: "Response Time", description: "Average detection to alert time" },
    { value: "99.9%", label: "Uptime", description: "System availability guarantee" },
    { value: "5+", label: "Concurrent Feeds", description: "Simultaneous video processing" },
    { value: "24/7", label: "Monitoring", description: "Continuous surveillance coverage" }
  ];

  const stakeholders = [
    {
      title: "Law Enforcement",
      description: "Enhance response capabilities with AI-powered threat detection and predictive analytics.",
      benefits: ["Faster response times", "Proactive crime prevention", "Data-driven insights", "Resource optimization"]
    },
    {
      title: "City Officials",
      description: "Improve public safety infrastructure with comprehensive crime mapping and analytics.",
      benefits: ["Crime hotspot identification", "Resource allocation", "Policy insights", "Public safety metrics"]
    },
    {
      title: "Security Providers",
      description: "Integrate existing camera networks with advanced AI capabilities for enhanced security.",
      benefits: ["Infrastructure integration", "Enhanced capabilities", "Cost-effective upgrades", "Scalable solutions"]
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Header */}
      <header className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Logo />
              <h1 className="text-2xl font-bold">Smart Surveillance System</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#features" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Features
              </a>
              <a href="#stakeholders" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Solutions
              </a>
              <a href="#contact" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Contact
              </a>
              <ThemeToggle />
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                Access System
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 dark:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              <a
                href="#features"
                className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#stakeholders"
                className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </a>
              <a
                href="#contact"
                className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Link
                to="/login"
                className="block mx-4 mt-4 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center shadow-sm"
              >
                Access System
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/[0.04] bg-[size:20px_20px]"></div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            >
              <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800">
                <Shield className="w-4 h-4 mr-2" />
                AUCA Innovation Center
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                AI-Powered Crime Prevention for{" "}
                <span className="text-blue-600 dark:text-blue-400">Safer Cities</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Advanced surveillance system combining artificial intelligence and machine learning
                for real-time threat detection, predictive crime mapping, and instant law enforcement alerts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <a
                  href="https://calendly.com/muneangechaste/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Request Demo
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <button className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium flex items-center justify-center">
                  <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Watch Overview
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  Rwanda Compliant
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  Enterprise Ready
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  24/7 Support
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative max-w-lg mx-auto lg:max-w-none"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Live System Status</h3>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                      <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">{stat.label}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.description}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm sm:text-base">Active Monitoring</div>
                      <div className="text-xs sm:text-sm opacity-90">Kigali Security Network</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-bold">142</div>
                      <div className="text-xs sm:text-sm opacity-90">Cameras Online</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Advanced Crime Prevention Technology
            </h2>
            <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
              Comprehensive AI-powered surveillance solution designed for modern law enforcement
              and public safety requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 lg:p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 border border-blue-200 dark:border-blue-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section id="stakeholders" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Solutions for Every Stakeholder
            </h2>
            <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
              Tailored functionality for law enforcement, city officials, and security providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
            {stakeholders.map((stakeholder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {stakeholder.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {stakeholder.description}
                </p>
                <div className="space-y-3">
                  {stakeholder.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center relative">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
            Ready to Transform Public Safety?
          </h2>
          <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            Join the future of crime prevention with our AI-powered surveillance system.
            Request a demo or contact our team to learn more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/muneangechaste/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Schedule Demo
            </a>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-slate-600 dark:text-slate-300">
              Ready to enhance your security infrastructure? Contact our team today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            <div className="order-2 lg:order-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    AUCA Innovation Center, Kigali, Rwanda
                  </span>
                </div>
                <div className="flex items-center">
                  <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    +250 783172388
                  </span>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    info@cmss.auca.ac.rw
                  </span>
                </div>
              </div>
            </div>

            <form className="space-y-6 order-1 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
              </div>
              <input
                type="text"
                placeholder="Organization"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <Logo />
              <p className="text-slate-400 mt-4 max-w-md leading-relaxed">
                Advanced AI-powered crime prevention system for safer communities.
                Developed by AUCA Innovation Center.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Video Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crime Mapping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Alert System</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Technical Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 AUCA Innovation Center. All rights reserved. Crime Mapping & Smart Surveillance System.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
