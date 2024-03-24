import React from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './utils/Title';

function App() {

  const getAlert = () => {
    let a = 10; let b = 20;
    alert(`sum is ${a + b}`);
  };

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
          data-testid="app-link"
        >
          Learn React
        </a>
      </header>
      <button onClick={() => getAlert()} data-testid="myButton" >Click Me</button>
      <Title title="hello" subtitle="hi" data-testid="mock-title" />
    </div>
  );
}

export default App;
