import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StyletronProvider } from 'styletron-react'; // Updated import
import { Client as Styletron } from 'styletron-engine-atomic';
import App from './App';
import reportWebVitals from './reportWebVitals';

const engine = new Styletron();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyletronProvider value={engine}>  {/* Updated to use Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StyletronProvider>
);

reportWebVitals();


