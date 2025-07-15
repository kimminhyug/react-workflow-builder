import React from 'react';

import { MainBackground } from './MainBackground';

export const MainIntro: React.FC = () => {
  // const typedText = useTypewriter('Kim Min-Hyeock', 150);

  return (
    <>
      <MainBackground />
      <section className="main-intro">
        <div className="main-intro-content">
          <h1 className="main-intro-title">React Flow Builder</h1>
        </div>
      </section>
    </>
  );
};
