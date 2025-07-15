import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

export const useTypewriter = (text: string, speed = 100) => {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>(0);

  useEffect(() => {
    setDisplayed('');
    indexRef.current = 0;

    intervalIdRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        // 일괄배치때매 회피용으로 추가 이거 안할꺼면 async로  처리해야할듯
        flushSync(() => {
          setDisplayed((prev) => prev + text[indexRef.current]);
        });
        indexRef.current += 1;
      } else {
        clearInterval(intervalIdRef.current);
      }
    }, speed);

    return () => clearInterval(intervalIdRef.current);
  }, [text, speed]);

  return displayed;
};
