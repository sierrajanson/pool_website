import './output.css';
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Home.js'
import Login from './Login.js'
import Form from './Form.js'
import Navbar from './Navbar.js'

function App() {

  return (
    <div>
    <Router>
      <Navbar/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>} />
              <Route path='/form' element={<Form/>} />          
          </Routes>
    </Router>
  </div>
  );
}
export default App;
