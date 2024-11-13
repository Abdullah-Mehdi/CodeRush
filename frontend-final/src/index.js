import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import App from './App';
import reportWebVitals from './reportWebVitals';  // Ensure this import exists

const engine = new Styletron();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyletronProvider value={engine}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StyletronProvider>
);

// Log performance metrics (optional)
reportWebVitals(console.log);  // You can pass console.log or any function to log results



