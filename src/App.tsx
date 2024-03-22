import React from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './utils/Title';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          test-id="app-link"
        >
          Learn React
        </a>
      </header>
      <Title title="hello" subtitle="hi" />
    </div>
  );
}

export default App;
