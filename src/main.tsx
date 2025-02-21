import { App } from '@/App';
import '@/index.css';
import { createRoot } from 'react-dom/client';

import './i18n';

createRoot(document.getElementById('root')!).render(<App />);
