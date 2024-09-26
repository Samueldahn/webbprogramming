import './App.css'
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from 'react-router-dom';



function App() {

  return (
    <div className="App">
      <Navbar />
      <main className="container mt-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
