import React, { useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";

// FAQ type
interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I add a new camera?",
    answer:
      "Click on the '+ Add Camera' button, fill in the required details, and submit the form.",
  },
  {
    question: "How do I view the live feed?",
    answer:
      "Click on the 'View Live Feed' button next to the connected camera.",
  },
  {
    question: "What should I do if my camera is disconnected?",
    answer:
      "Ensure that the camera is powered on and properly connected to the network. If the issue persists, try reconnecting the camera.",
  },
];

const HelpAndSupport: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Support:", { email, message });
    setEmail("");
    setMessage("");
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl mt-24 font-bold mb-6">Help and Support Center</h1>
      <p className="mb-6">
        Welcome to the Help and Support page! Here you'll find answers to common
        questions, user guides, and the option to contact our support team for
        further assistance.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        Frequently Asked Questions (FAQs)
      </h2>
      <div className="mb-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b mb-2">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full py-2 text-left font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <span>{faq.question}</span>
              <span
                className={`transform transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                &#9660;
              </span>
            </button>
            {openIndex === index && (
              <div className="pl-4 pb-2 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">User Guides</h2>
      <ul className="mb-6 space-y-2">
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            How to Add a New Camera
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            How to View Live Feeds
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            Troubleshooting Camera Connections
          </a>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
      <p className="mb-4">
        If you need further assistance, please fill out the form below:
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded-md w-full p-2"
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primaryGradientStart text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-600"
        >
          Send Message
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-6">Feedback</h2>
      <p>If you have any suggestions to improve our app, please let us know!</p>
    </DashboardLayout>
  );
};

export default HelpAndSupport;
