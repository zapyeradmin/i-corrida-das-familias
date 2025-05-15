
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Import the CSS files in the correct order
import './styles/theme.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/responsive.css';

createRoot(document.getElementById("root")!).render(<App />);
