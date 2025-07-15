import { ReactFlowProvider } from '@xyflow/react';
import { WorkflowCanvas } from './pages/WorkflowCanvas';
import '@xyflow/react/dist/style.css';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

initializeIcons();
function App() {
  return (
    <div style={{ height: '100vh', width: '100vw', padding: 5, boxSizing: 'border-box' }}>
      <ReactFlowProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<WorkflowCanvas />} />
        </Routes>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
