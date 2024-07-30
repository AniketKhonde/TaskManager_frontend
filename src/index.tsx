// index.tsx or index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the app into the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
