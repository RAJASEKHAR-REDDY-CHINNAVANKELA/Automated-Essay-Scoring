import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import EssaySubmission from './components/EssaySubmission';
import EvaluationCriteria from './components/EvaluationCriteria';  // Import the new component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/essay-submission" element={<EssaySubmission />} />
          <Route path="/evaluation-criteria" element={<EvaluationCriteria />} />  // Add the new route
        </Routes>
      </div>
    </Router>
  );
}

export default App;
