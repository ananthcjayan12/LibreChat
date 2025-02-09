import 'regenerator-runtime/runtime';
import { createRoot } from 'react-dom/client';
import { ApiErrorBoundaryProvider } from './hooks/ApiErrorBoundaryContext';
import './style.css';
import './mobile.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ApiErrorBoundaryProvider>
    <App />
  </ApiErrorBoundaryProvider>,
);
