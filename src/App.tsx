import { ReactFlowProvider } from '@xyflow/react';
import { WorkflowCanvas } from './components/Workflow/WorkflowCanvas';
import '@xyflow/react/dist/style.css';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();
function App() {
  return (
    <div style={{ height: '100vh', width: '100vw', padding: 5, boxSizing: 'border-box' }}>
      <ReactFlowProvider>
        <WorkflowCanvas />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
