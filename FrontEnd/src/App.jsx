import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello</h1>} />
    </Routes>
  )
}

export default App
