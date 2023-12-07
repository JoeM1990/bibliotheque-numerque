import './App.css';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Footer from "../src/components/Footer";
import Home from "../src/pages/Home";
import Library from "../src/pages/Library";
import Add from "../src/pages/Add";
import Signin from "../src/pages/Signin";
import Signup from "../src/pages/Signup";
import Search from "../src/pages/Search";
import Contact from "../src/pages/Contact";
import Page404 from "../src/pages/Page404";
import ButtonTop from './components/ButtonTop';
import Book from './pages/Book';
import Legals from './pages/Legals';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/add" element={<Add />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legals" element={<Legals />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
      <ButtonTop />
      <Footer />
    </div>
  );
}

export default App;
