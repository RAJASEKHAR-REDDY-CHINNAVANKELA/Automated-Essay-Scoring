import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import mammoth from 'mammoth';
import { getAuth } from "firebase/auth";
import * as pdfjsLib from 'pdfjs-dist/webpack';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const EssaySubmission = () => {
  const [content, setContent] = useState('');
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('Awaiting Feedback...');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [interimText, setInterimText] = useState('');
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [loading, setLoading] = useState(false);  // For loading states
  const [essayType, setEssayType] = useState('source_based');  // Default to source-based
  const [essays, setEssays] = useState([]);  // Store all essay submissions

  useEffect(() => {
    if (selectedEssay) {
      setContent(selectedEssay.inputEssay);
      setScore(selectedEssay.score);
      setFeedback(selectedEssay.feedback);
    }
  }, [selectedEssay]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setInterimText(interimTranscript);
      setContent(prevContent => prevContent + finalTranscript);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      recognitionInstance.stop();
      recognitionInstance.onresult = null;
      recognitionInstance.onend = null;
    };
  }, []);

  const handleSpeechStart = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const handleSpeechStop = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setSubmissionMessage('You must be logged in to submit an essay.');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://127.0.0.1:5000/submit_essay', { content, essay_type: essayType });
      const { score, feedback, message } = response.data;

      setScore(score);
      setFeedback(feedback);
      setSubmissionMessage(message);

      const newEssay = {
        inputEssay: content,
        feedback: feedback,
        score: score,
        timestamp: new Date(),
        userId: user.uid,
      };

      await addDoc(collection(db, 'essays'), newEssay);

      // Update the list of essays and the sidebar
      setEssays(prevEssays => [newEssay, ...prevEssays]);
      setSelectedEssay(newEssay);  // Immediately show the new essay in the sidebar
    } catch (error) {
      console.error('There was an error submitting the essay!', error);
      setSubmissionMessage('There was an error submitting the essay. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleAudioFeedback = async () => {
    setLoading(true); // Start loading for audio feedback
    try {
      const response = await axios.post('http://127.0.0.1:5000/text_to_speech', { feedback });
      const { message } = response.data;
      setSubmissionMessage(message);

      const audioResponse = await axios.get('http://127.0.0.1:5000/get_audio_feedback', { responseType: 'blob' });
      const audioUrl = URL.createObjectURL(new Blob([audioResponse.data], { type: 'audio/mp3' }));
      setAudioSrc(audioUrl);
    } catch (error) {
      console.error('There was an error generating the audio feedback!', error);
      setSubmissionMessage('There was an error generating the audio feedback. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      let newEssayContent = '';

      if (fileExtension === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        newEssayContent = value;
        setContent(value);
      } else if (fileExtension === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let pdfText = '';
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          pdfText += pageText;
        }
        newEssayContent = pdfText;
        setContent(pdfText);
      } else {
        alert('Unsupported file type. Please upload a .docx or .pdf file.');
      }

      // Update the new essay immediately in the sidebar
      const newEssay = {
        inputEssay: newEssayContent,
        feedback: 'Awaiting Feedback...',
        score: 'N/A',
        timestamp: new Date(),
      };
      setEssays(prevEssays => [newEssay, ...prevEssays]);
      setSelectedEssay(newEssay);  // Immediately show the new essay in the sidebar
    }
  };

  return (
    <div className="relative flex min-h-screen bg-[#f4c28e] text-gray-800">
      <Sidebar essays={essays} setSelectedEssay={setSelectedEssay} /> {/* Pass essays */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold mb-8">Submit Your Essay</h1>
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-6xl mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="content">
                Essay Content
              </label>
              <textarea
                id="content"
                className="shadow appearance-none border rounded w-full h-48 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                value={content + interimText}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Essay Type Selection */}
            <div className="mb-4">
              <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="essay_type">
                Essay Type
              </label>
              <select
                id="essay_type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setEssayType(e.target.value)}
              >
                <option value="source_based">Source-Based Writing</option>
                <option value="independent">Independent Writing</option>
              </select>
            </div>

            <div className="flex justify-center space-x-4 mb-4">
              <button
                type="button"
                className="flex-1 h-12 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                onClick={isListening ? handleSpeechStop : handleSpeechStart}
              >
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </button>
              <input
                type="file"
                accept=".docx, .pdf"
                onChange={handleFileUpload}
                className="flex-1 h-12 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              />
              <button
                type="submit"
                className="flex-1 h-12 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                disabled={loading}  // Disable submit when loading
              >
                {loading ? 'Submitting...' : 'Submit Essay'}
              </button>
            </div>
          </form>
        </div>

        {submissionMessage && (
          <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-6xl mb-8">
            <p className="text-center text-lg text-gray-800">{submissionMessage}</p>
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-6xl mb-8 relative">
          <h2 className="text-4xl font-extrabold mb-8 text-center">Essay Feedback</h2>
          <div className="absolute top-4 right-4 flex flex-col items-center justify-center text-xl font-bold">
            <div className="flex items-center justify-center bg-red-600 text-white w-24 h-24 rounded-full mt-2">
              <span className="text-2xl font-bold">{`${score}/6`}</span>
            </div>
            <span>Score</span>
          </div>
          <div className="mb-4 mt-12">
            <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="feedback">
              Feedback
            </label>
            <textarea
              id="feedback"
              className="shadow appearance-none border rounded w-full h-48 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              value={feedback}
              readOnly
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleAudioFeedback}
              className="bg-red-600 text-white font-bold py-2 px-24 rounded-full focus:outline-none focus:shadow-outline"
              disabled={loading}  // Disable audio feedback button when loading
            >
              {loading ? 'Generating Audio...' : 'Audio Feedback'}
            </button>
          </div>

          {audioSrc && (
            <div className="flex justify-center mt-8">
              <audio controls src={audioSrc}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EssaySubmission;
