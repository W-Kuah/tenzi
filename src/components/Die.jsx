import { useRef, useEffect } from 'react'

export default function Die(props) {
  
  const { value, isHeld, hold, rolls, switchDieAnim, animating  } = props;
  const dieRef = useRef(null);

  const classStyle = isHeld ? "die hold" : "die";

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      hold?.();
    }
  };

  const rollDice = (num) => {
    return new Promise(resolve => {
      if (!dieRef.current) return;
      
      dieRef.current.style.animation = 'rolling 4s';
      const timeoutId = setTimeout(() => {
        if (!dieRef.current) return; 
        
        switch (num) {
          case 1: dieRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'; break;
          case 6: dieRef.current.style.transform = 'rotateX(180deg) rotateY(0deg)'; break;
          case 2: dieRef.current.style.transform = 'rotateX(-90deg) rotateY(0deg)'; break;
          case 5: dieRef.current.style.transform = 'rotateX(90deg) rotateY(0deg)'; break;
          case 3: dieRef.current.style.transform = 'rotateX(0deg) rotateY(90deg)'; break;
          case 4: dieRef.current.style.transform = 'rotateX(0deg) rotateY(-90deg)'; break;
          default: break;
        }
        
        dieRef.current.style.animation = 'none';
        resolve();
      }, 4500);
      
      return timeoutId;
    });
  };

  useEffect(() => {
    let timer1;
    let timer2;

    const animate = async () => {
      switchDieAnim(true); 
      timer1 = await rollDice(value);
      timer2 = await delay(950);
      switchDieAnim(false); 
    };
    animate();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  
  }, [rolls])

  return (
    <div className="diceContainer">
      <div 
        className={classStyle}
        ref={dieRef}
        onClick={animating ? null : hold}
        onKeyDown={handleKeyDown}
        aria-label={`Die with value ${value}, ${isHeld ? 'held' : 'not held'}`}
        aria-pressed={isHeld}
        role="button"
        tabIndex="0"
      >
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
        <div className="face right"></div>
        <div className="face left"></div>
      </div>
    </div>
    
  )
}
