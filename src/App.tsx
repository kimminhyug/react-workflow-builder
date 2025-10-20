import { initializeIcons } from '@fluentui/react/lib/Icons';
import '@xyflow/react/dist/style.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';

import { Builder } from './pages/Builder';

initializeIcons();

function App() {
  return (
    <div style={{ height: '100%', width: '100%', padding: 5, boxSizing: 'border-box' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </div>
  );
}

export default App;
