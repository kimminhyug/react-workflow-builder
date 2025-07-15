import { Handle, Position } from '@xyflow/react';

import { useNavigate } from 'react-router-dom';
import { TypeWriter } from '../../common/TypeWriter';

export const MainPageNode = () => {
  const navigate = useNavigate();
  const handleClickStart = () => {
    navigate('/builder');
  };

  const handleClickGitLink = () => {
    window.open('https://github.com/kimminhyug', '_blank');
  };
  return (
    <div
      className="main-page-node"
      style={{
        width: '100%',
        pointerEvents: 'all',
        height: 200,
      }}
    >
      <div
        className=""
        style={{
          marginTop: 50,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          onClick={handleClickGitLink}
          className="main-intro-subtext"
          style={{ cursor: 'pointer' }}
        >
          <TypeWriter text="Made by Kim Min-Hyeock" />
        </div>
        <div className="main-intro-button" onClick={handleClickStart} style={{ cursor: 'pointer' }}>
          시작
        </div>
      </div>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
};
