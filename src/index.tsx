import { Home } from 'pages/Home';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const container = document.getElementById('app')!;

const root = createRoot(container);
root.render(
    <StrictMode>
        <BrowserRouter basename={`/`}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<div>404 처리예정</div>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
