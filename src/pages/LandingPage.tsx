import { ArrowRight, ChevronUp } from 'lucide-react';
import logo from '../assets/logo.svg'
import homeImg from '../assets/homeImg.png'
import hateCrime from '../assets/hateCrime.png'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';


const LandingPage = () => {

  return (
    <div className="bg-primaryBackground w-[100vw] text-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-10">
        <div className="flex items-center flex-col">
          <img src={logo} alt="CM&3S Logo" className="h-16 w-16 mr-2" />
          <span className="font-bold text-l">CM&3S</span>
        </div>
        <nav className="hidden md:flex items-center space-x-4 text-xl">
          <a href="#" className="text-white hover:text-white-400">About Us</a>
          <a href="#" className="text-white hover:text-white-400">Contact Us</a>
          <button className="bg-primaryBackground text-white px-6 py-1 rounded hover:bg-purple-600"><span></span>Login</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto px-4 py-16 flex md:flex-row gap-32 justify-items-start w-[95%]">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold mb-4">Welcome to Crime Mapping & Smart Surveillance System</h1>
          <p className="mb-6 text-xl">Empowering Communities with Real-Time Crime Alerts and Prevention Tools</p>
          <button className="bg-primaryBackground text-white px-6 py-3 rounded-full flex items-center hover:bg-purple-700">
            Get Started <ArrowRight className="ml-2" />
          </button>
        </div>
          <img src={homeImg} alt="Surveillance" className="w-[250px] h-[250px] rounded-lg" />
      </section>

      {/* About Us Section */}
      <section className="py-12 w-[100%]">
        <div className="container mx-auto px-4 flex justify-items-start gap-[10%]">
           <img src={hateCrime} alt="Hate Crime" className="rounded-lg w-[457px] h-[286px]" />
          <div>
              <h2 className="text-3xl font-bold mb-8">About Us</h2>
              <p className="mb-4">Empowering Communities with Technology at CMSS, we are passionate about providing smart city solutions to make innovative crime mapping and prevention accessible to all. Our mission is to create a safer society and data-driven approach to law enforcement using through AI-powered tools.</p>
              <ul className="list-disc list-inside space-y-2">
                <li><span className='font-bold'>Our goal</span> is to make crime data more accessible to everyone, enabling better decision-making and law enforcement agencies to work more efficiently.</li>
                <li><span className='font-bold'>Our Vision:</span> To empower communities with the tools they need to stay informed and actively prevent crime in their areas.</li>
                <li><span className='font-bold'>Our Mission: </span>To leverage cutting-edge technology to provide real-time crime insights, enhancing safety and security for everyone.</li>
              </ul>
            </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-8">
        <div className="container mx-auto px-4 w-[95%] flex gap-[20%]">
            <div className="bg-primaryBackground p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p>To create safer, connected communities by making advanced crime prevention tools and real-time data accessible to all, fostering collaboration between law enforcement and citizens for a secure future.</p>
            </div>
            <div className="bg-invertedPrimaryBackground p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p>To harness advanced crime mapping, surveillance, and data analysis technologies to empower law enforcement and communities with real-time insights, promoting proactive crime prevention and enhanced safety.</p>
            </div>
          </div>
      </section>

       <button className="bg-black p-2 flex mx-[49%] mb-4 rounded-full hover:bg-purple-700">
        <ChevronUp />
      </button>

      {/* Footer */}
      <footer className="bg-invertedPrimaryBackground border-t-2 py-8">
        <div className="container mx-auto items-center justify-center px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h4 className="font-bold mb-2 text-center">Quick Links</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-purple-400">Home</a></li>
                <li><a href="#" className="hover:text-purple-400">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400">Services</a></li>
                <li><a href="#" className="hover:text-purple-400">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h4 className="font-bold mb-2 text-center">Social Platforms</h4>
              <div className="flex space-x-4">
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

            </div>
            <div className="w-full md:w-auto">
              <h4 className="font-bold mb-2 text-center">Our Partners</h4>
              <div className="flex space-x-4">
                <img src="/api/placeholder/40/40" alt="Partner 1" className="rounded" />
                <img src="/api/placeholder/40/40" alt="Partner 2" className="rounded" />
                <img src="/api/placeholder/40/40" alt="Partner 3" className="rounded" />
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2024 CMSS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;