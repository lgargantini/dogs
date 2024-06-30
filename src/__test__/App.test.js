import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';

it('renders without crashing', () => {
  const container = document.createElement('root');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App />);
});
