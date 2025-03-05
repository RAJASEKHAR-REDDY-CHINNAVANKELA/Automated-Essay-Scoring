

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';


const firebaseConfig = {
  apiKey: "AIzaSyAeFzO7U7tY2Sn7Do-pCvPafIwqklOE2m8",
  authDomain: "automated-essay-scoring-49fc4.firebaseapp.com",
  projectId: "automated-essay-scoring-49fc4",
  storageBucket: "automated-essay-scoring-49fc4.appspot.com",
  messagingSenderId: "75341625528",
  appId: "1:75341625528:web:7b44282c99505a04b49c4d",
  measurementId: "G-C2CBCEVG8Q"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
