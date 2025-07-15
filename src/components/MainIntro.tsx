import React from 'react';

import { useNavigate } from 'react-router-dom';
import { TypeWriter } from './common/TypeWriter';

export const MainIntro: React.FC = () => {
  // const typedText = useTypewriter('Kim Min-Hyeock', 150);
  const navigate = useNavigate();

  const handleClickStart = () => {
    navigate('/builder');
  };

  const handleClickGitLink = () => {
    window.open('https://github.com/kimminhyug', '_blank');
  };

  return (
    <section className="main-intro">
      <div className="main-intro-content">
        <h1 className="main-intro-title">React Flow Builder</h1>
        <div className="main-intro-subtext">
          <div onClick={handleClickGitLink} className="main-intro-subtext">
            <TypeWriter text="Made by Kim Min-Hyeock" />
          </div>
        </div>
        <button className="main-intro-button" onClick={handleClickStart}>
          시작
        </button>
      </div>
    </section>
  );
};
