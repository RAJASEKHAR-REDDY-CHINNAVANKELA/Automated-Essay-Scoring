import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {

    return /^[\w-\.]+@gmail\.com$/.test(email);
  };

  const isValidPassword = (password) => {

    return password.length >= 8 && /\d/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid gmail.com email address.' });
      return;
    }

    if (!isValidPassword(password)) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long and contain at least one number.' });
      return;
    }

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      await sendEmailVerification(user);
      setMessage({ type: 'success', text: 'Account was created successfully! A verification email has been sent.' });

      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (error) {
      console.error('There was an error signing up!', error);
      if (error.code === 'auth/email-already-in-use') {
        setMessage({ type: 'error', text: 'The email address is already in use by another account.' });
      } else {
        setMessage({ type: 'error', text: 'There was an error signing up. Please try again.' });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4c28e] text-gray-800">
      <h1 className="text-4xl font-extrabold mb-8">Sign Up</h1>
      <form className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition duration-500 hover:scale-105" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 hover:from-yellow-600 hover:via-orange-700 hover:to-red-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transform transition duration-300 hover:scale-110">
            Sign Up
          </button>
        </div>
      </form>
      {message && (
        <div className={`mt-4 px-4 py-3 rounded relative ${message.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`} role="alert">
          <strong className="font-bold">{message.type === 'success' ? 'Success!' : 'Error!'}</strong>
          <span className="block sm:inline"> {message.text}</span>
        </div>
      )}
    </div>
  );
};

export default SignUp;
