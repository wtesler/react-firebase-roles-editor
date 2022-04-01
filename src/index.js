import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Root from './test-env/src/Components/Root/Root';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>
);
