import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f4c28e] text-gray-800 flex flex-col">
      <nav className="bg-gradient-to-r from-red-600 via-orange-500 to-red-700 shadow-xl rounded-lg m-8 p-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <a href="#" className="flex items-center py-2 px-2 text-white">
                <span className="font-bold text-2xl">AES System</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1 ml-auto">
              <Link to="/" className="py-2 px-3 text-white hover:text-gray-300 text-lg font-serif">Home</Link>
              <Link to="/signup" className="py-2 px-3 text-white hover:text-gray-300 text-lg font-serif">Sign Up</Link>
              <Link to="/signin" className="py-2 px-3 text-white hover:text-gray-300 text-lg font-serif">Sign In</Link>
              <Link to="/evaluation-criteria" className="py-2 px-3 text-white hover:text-gray-300 text-lg font-serif">Evaluation Criteria</Link> {/* Add this line */}
              <Link to="/#essay-submission" className="py-2 px-3 text-white hover:text-gray-300 text-lg font-serif">Submit Essay</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-6xl font-extrabold mb-6 text-dark">Automated Essay Scoring</h1>
          <p className="text-xl mb-6 text-dark">
            Experience the power of our AES system, utilizing advanced NLP and machine learning algorithms for real-time, accurate, and insightful evaluations of written essays.
          </p>
          <p className="text-xl mb-6 text-dark">
            Enhance your writing with instant feedback and detailed score reports. Whether you're a student or an educator, our AES system provides a comprehensive solution to meet your needs.
          </p>
          <p className="text-xl mb-6 text-dark">
            The AES system is designed to analyze various aspects of writing, including grammar, coherence, structure, and creativity. By providing instant feedback and detailed score reports, it empowers users to understand their strengths and areas for improvement, fostering a deeper understanding of effective writing techniques.
          </p>
          <p className="text-xl mb-6 text-dark">
            Embrace the future of essay evaluation with our cutting-edge AES system and take your writing to the next level. Our innovative approach ensures fairness, consistency, and objectivity in essay scoring, making it an invaluable tool for educational institutions and learners alike.
          </p>
        </div>
      </div>
      <div className="bg-[#f4c28e] text-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose AES?</h2>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 mb-12 md:mb-0">
              <div className="bg-white p-6 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 h-full">
                <h3 className="text-2xl font-semibold mb-4">Accurate Scoring</h3>
                <p>Our AES system provides accurate scoring by analyzing essays using advanced algorithms. This ensures that every essay is evaluated based on standardized criteria, providing consistent and fair results.</p>
              </div>
            </div>
            <div className="flex-1 mb-12 md:mb-0">
              <div className="bg-white p-6 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 h-full">
                <h3 className="text-2xl font-semibold mb-4">Instant Feedback</h3>
                <p>Get instant feedback on your essays to help you improve your writing skills. Our system provides detailed reports highlighting strengths and areas for improvement.</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white p-6 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 h-full">
                <h3 className="text-2xl font-semibold mb-4">Advanced NLP</h3>
                <p>Leveraging the latest in Natural Language Processing, our AES system understands and evaluates the intricacies of your writing, providing a comprehensive assessment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
