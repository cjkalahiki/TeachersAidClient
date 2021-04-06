import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
