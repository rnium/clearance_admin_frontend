import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Homepage from './pages/Homepage';

const Main = () => {
  return (
    <div>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </div>
  )
}

export default Main