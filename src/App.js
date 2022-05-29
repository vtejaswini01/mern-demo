import './App.css';
import { FcAbout } from 'react-icons/fc'
import { Route, Routes, NavLink } from 'react-router-dom'
import {Nav,Navbar,Container} from 'react-bootstrap'
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup'
import Contactus from './components/Contactus'


function App() {
  return (
    <div className='text-center text-info'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React-App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id=" justify-content-end">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/signup">Signup</NavLink>
            <NavLink className="nav-link" to="/login">Login</NavLink>
            <NavLink className="nav-link" to="/contactus">Contactus</NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>

    </div>
  );
}

export default App;
