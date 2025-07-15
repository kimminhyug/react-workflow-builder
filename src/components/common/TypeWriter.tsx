import { useTypewriter } from '../../hooks/useTypeWriter';

export const TypeWriter = ({ text = '' }) => {
  const typed = useTypewriter(text, 150);

  return (
    <p className="typewriter">
      {typed}
      <span className="cursor">|</span>
    </p>
  );
};
