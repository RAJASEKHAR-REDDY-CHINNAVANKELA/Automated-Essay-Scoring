import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';

const Sidebar = ({ setSelectedEssay }) => {
  const [essays, setEssays] = useState(JSON.parse(localStorage.getItem('essays')) || []);
  const [isOpen, setIsOpen] = useState(JSON.parse(localStorage.getItem('isOpen')) || false);

  useEffect(() => {
    const fetchEssays = () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        console.log("User ID: ", user.uid);
        const essaysCollection = collection(db, 'essays');
        const q = query(essaysCollection, where('userId', '==', user.uid));


        onSnapshot(q, (querySnapshot) => {
          const essayList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log("Fetched Essays: ", essayList);
          setEssays(essayList);
          localStorage.setItem('essays', JSON.stringify(essayList)); // Save essays to local storage
        });
      } else {
        console.log("No user is logged in.");
      }
    };

    fetchEssays();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    localStorage.setItem('isOpen', JSON.stringify(!isOpen)); // Save isOpen state to local storage
  };

  return (
    <div>
      <button
        className="fixed top-0 left-0 m-4 text-2xl font-bold text-white bg-red-600 rounded-full px-6 py-3 z-30 cursor-pointer"
        onClick={toggleSidebar}
      >
        AES
      </button>

      <div
        className={`fixed top-0 left-0 h-full z-20 bg-[#f4c28e] shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '250px' }}
      >
        <div className="p-4 text-3xl font-bold cursor-pointer" onClick={toggleSidebar}>
          {isOpen ? 'Close' : 'AES'}
        </div>
        {isOpen && (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Submissions</h2>
            <ul className="overflow-y-auto" style={{ maxHeight: '80vh' }}> {/* Make this area scrollable */}
              {essays.map(essay => (
                <li
                  key={essay.id}
                  onClick={() => setSelectedEssay(essay)}
                  className="p-2 mb-2 bg-white shadow-md rounded cursor-pointer"
                >
                  <div><strong>Essay:</strong> {essay.inputEssay.slice(0, 50)}...</div>
                  <div><strong>Score:</strong> {essay.score}/6</div>
                  <div><strong>Submitted:</strong> {formatDate(essay.timestamp)}</div>
                  <div><strong>Feedback:</strong> {essay.feedback.slice(0, 50)}...</div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
