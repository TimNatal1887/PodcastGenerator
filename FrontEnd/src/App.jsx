import React from 'react'
import { Route, Routes } from 'react-router-dom'
import "./App.css"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className='page-wrap'>
          <h1>Hello</h1>
        </div>
      } />
    </Routes>
  )
}

export default App
