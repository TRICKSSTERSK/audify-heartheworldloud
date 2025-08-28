import React, { useState, useEffect } from 'react';

const AnimatedHeadline = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const texts = [
    { text: 'Hear the World, Loud and Clear', lang: 'en' },
    { text: 'दुनिया की बातें साफ़ और तेज़ सुनो।', lang: 'hi' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 
      className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 transition-all duration-300 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}
      style={{
        fontFamily: texts[currentText].lang === 'hi' ? "'Noto Sans Devanagari', sans-serif" : "'Inter', sans-serif"
      }}
    >
      {texts[currentText].text.split(' ').map((word, index) => {
        const isHighlight = texts[currentText].lang === 'en' 
          ? (word === 'Loud' || word === 'Clear') 
          : (word === 'साफ़' || word === 'तेज़');
        
        return (
          <span key={`${currentText}-${index}`}>
            {isHighlight ? (
              <span className="text-primary">{word}</span>
            ) : (
              word
            )}
            {index < texts[currentText].text.split(' ').length - 1 && ' '}
          </span>
        );
      })}
    </h1>
  );
};

export default AnimatedHeadline;