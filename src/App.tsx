import { initializeIcons } from '@fluentui/react/lib/Icons';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { WorkflowCanvas } from './pages/WorkflowCanvas';

initializeIcons();

function App() {
  return (
    <div style={{ height: '100%', width: '100%', padding: 5, boxSizing: 'border-box' }}>
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
