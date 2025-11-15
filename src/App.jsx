import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Destination from './pages/Destination'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import Reviews from './pages/Reviews'
import './App.css'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
