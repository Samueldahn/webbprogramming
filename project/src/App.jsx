import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;