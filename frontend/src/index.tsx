import { createRoot } from 'react-dom/client';

import App from './App';
import './index.scss';

createRoot(document.querySelector('[data-application-root]')!).render(<App />);
