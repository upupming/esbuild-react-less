import React, { useState } from 'react';
import logo from './logo.svg';
import './App.less';

export default () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello esbuild + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test browser-sync updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://github.com/upupming/esbuild-react-less"
            target="_blank"
            rel="noopener noreferrer"
          >
            esbuild-react-less
          </a>
        </p>
      </header>
    </div>
  );
};
