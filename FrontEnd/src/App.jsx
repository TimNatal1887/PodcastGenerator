import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css";

const App = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      setAudioFile(file);
      const fileURL = URL.createObjectURL(file);
      setAudioURL(fileURL);
    }
  };

  const handleSubmit = () => {
  //   if (audioFile) {
  //     const formData = new FormData();
  //     formData.append('audio', audioFile);

  //     // Example: Sending the file to a backend API
  //     fetch('https://your-backend-api.com/upload', {
  //       method: 'POST',
  //       body: formData,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('File uploaded successfully:', data);
  //       })
  //       .catch((error) => {
  //         console.error('Error uploading file:', error);
  //       });
  //   } else {
  //     alert('Please select an audio file before submitting.');
  //   }
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <div className='page-wrap'>
            {/* {console.log(audioFile)} */}
            <h1 className='text-2xl font-bold text-center mb-4'>Podcast Generator</h1>
            <div className='max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg'>
              <textarea 
                className='w-full p-2 border border-gray-300 rounded-md mb-4' 
                placeholder='Write your transcript here...'
                rows={6}
              ></textarea>
              <div className='flex justify-between'>
                <button 
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
                  Submit
                </button>
                <label 
                  className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer'>
                  Submit Audio File
                  <input 
                    type='file' 
                    accept='audio/*' 
                    className='hidden' 
                    onChange={handleFileChange} 
                  />
                </label>
              </div>
              <button 
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full' 
                onClick={handleSubmit}>
                Upload File
              </button>
              {audioURL && (
                <div className='mt-4'>
                  <h2 className='text-lg font-bold'>Audio Preview:</h2>
                  <audio controls className='w-full mt-2'>
                    <source src={audioURL} type={audioFile?.type} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          </div>
        } 
      />
    </Routes>
  );
};

export default App;
