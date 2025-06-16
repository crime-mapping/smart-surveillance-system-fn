import React, { useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";

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
      "Ensure the camera is powered on and properly connected. Try reconnecting if the issue persists.",
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
      <section className="max-w-4xl mx-auto mt-24 px-4 py-8 text-[var(--text-color)]">
        <h1 className="text-4xl font-extrabold mb-4 text-center">
          Help & Support
        </h1>
        <p className="mb-8 text-center text-lg text-[var(--text-color)]">
          Find answers to common questions, explore our guides, or reach out for
          personalized support.
        </p>

        {/* FAQs */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">FAQs</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left font-medium bg-[var(--card-bg)] hover:bg-[var(--hover-bg)] transition-colors"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4 text-sm text-gray-700 text-[var(--text-color)]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* User Guides */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">User Guides</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li>
              <a
                href="#"
                className="text-blue-600 text-[var(--text-color)] hover:underline"
              >
                How to Add a New Camera
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 text-[var(--text-color)] hover:underline"
              >
                How to View Live Feeds
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Troubleshooting Camera Connections
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
          <p className="mb-4 text-[var(--text-color)]">
            Need help? Fill out the form below and our team will get back to you
            as soon as possible.
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--card-bg)] border border-gray-200  rounded-lg p-6 shadow-md"
          >
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 text-[var(--text-color)]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 bg-[var(--card-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-primaryGradientStart"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium  text-[var(--text-color)]">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-[var(--card-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-primaryGradientStart"
                rows={5}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primaryGradientStart hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Feedback Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Feedback</h2>
          <p className="text-gray-600 text-[var(--text-color)]">
            Have ideas for improvement? We're always listening.
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default HelpAndSupport;
