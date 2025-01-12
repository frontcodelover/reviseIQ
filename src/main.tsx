import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import './i18n';
import { App } from '@/App';

createRoot(document.getElementById('root')!).render(<App />);
