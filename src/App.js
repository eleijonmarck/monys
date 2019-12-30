import React from 'react';
import logo from './logo.svg';
import InterestRate from './InterestRate/InterestRate.js';
import Login from './Login/Login.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </header>
      <Login></Login>
      <InterestRate></InterestRate>
    </div>
  );
}

export default App;
