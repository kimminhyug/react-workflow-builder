import React from 'react';
import { useTypewriter } from '../hooks/useTypeWriter';
import { useNavigate } from 'react-router-dom';

export const MainBacground: React.FC = () => {
  const typedText = useTypewriter('Kim Min-Hyeock', 150);
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
          Made by
          <div onClick={handleClickGitLink} className="main-intro-subtext">
            {typedText}
          </div>
        </div>
        <button className="main-intro-button" onClick={handleClickStart}>
          시작
        </button>
      </div>
    </section>
  );
};
