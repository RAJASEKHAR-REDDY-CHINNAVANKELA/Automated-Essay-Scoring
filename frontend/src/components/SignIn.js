import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      if (user.emailVerified) {
        navigate('/essay-submission');
      } else {
        setError('Please verify your email before signing in.');
      }
    } catch (error) {
      console.error('There was an error signing in!', error);
      setError('Wrong email or password. Please try again.');
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (error) {
      console.error('There was an error sending the reset email!', error);
      setError('Error sending password reset email. Make sure the email is correct.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4c28e] text-gray-800">
      <h1 className="text-4xl font-extrabold mb-8">Sign In</h1>
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
              type={showPassword ? 'text' : 'password'} // Toggle input type between 'password' and 'text'
              className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)} // Toggle the visibility state
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
        <div className="flex justify-center">
          <button type="submit" className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 hover:from-yellow-600 hover:via-orange-700 hover:to-red-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transform transition duration-300 hover:scale-110">
            Sign In
          </button>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button type="button" className="text-sm text-blue-600 hover:underline" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </div>
        {resetEmailSent && <div className="mt-4 text-green-600 font-semibold">Password reset email sent!</div>}
      </form>
    </div>
  );
};

export default SignIn;
