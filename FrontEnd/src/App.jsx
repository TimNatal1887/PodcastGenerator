import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <div className='page-wrap'>
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
                  />
                </label>
              </div>
            </div>
          </div>
        } 
      />
    </Routes>
  );
};

export default App;