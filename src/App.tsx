import React, { useState, useRef, useEffect } from 'react';
import { Utensils, Coffee } from 'lucide-react';

const foodOptions = [
  '火锅', '寿司', '披萨', 
  '炒面', '汉堡', '面条',
  '烤肉', '沙拉', '盖饭',
  '饺子', '三明治', '炒饭'
];

function App() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [spinDegrees, setSpinDegrees] = useState(0);

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult(null);

    // Calculate new rotation
    const extraSpins = 5; // Number of full rotations
    const randomDegree = Math.random() * 360;
    const totalDegrees = (extraSpins * 360) + randomDegree;
    
    // Update spin degrees
    setSpinDegrees(prevDegrees => prevDegrees + totalDegrees);

    // Calculate result after animation
    setTimeout(() => {
      const finalRotation = spinDegrees + totalDegrees;
      const normalizedRotation = finalRotation % 360;
      const selectedIndex = Math.floor((360 - normalizedRotation) / (360 / foodOptions.length));
      setResult(foodOptions[selectedIndex]);
      setSpinning(false);
    }, 3000); // Changed from 5000 to 3000
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-2 flex items-center justify-center gap-2">
          <Utensils className="w-8 h-8" />
          今天吃什么？
          <Coffee className="w-8 h-8" />
        </h1>
        <p className="text-gray-600">让我们帮你决定今天的美食！</p>
      </div>

      <div className="relative w-80 h-80 mb-8">
        <div
          ref={wheelRef}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '8px solid #fb923c',
            transform: `rotate(${spinDegrees}deg)`,
            transition: spinning ? 'transform 3s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none', // Changed from 5s to 3s
            backgroundImage: `conic-gradient(
              from 0deg,
              #f97316 0deg 30deg,
              #fb923c 30deg 60deg,
              #fdba74 60deg 90deg,
              #f97316 90deg 120deg,
              #fb923c 120deg 150deg,
              #fdba74 150deg 180deg,
              #f97316 180deg 210deg,
              #fb923c 210deg 240deg,
              #fdba74 240deg 270deg,
              #f97316 270deg 300deg,
              #fb923c 300deg 330deg,
              #fdba74 330deg 360deg
            )`,
            willChange: 'transform'
          }}
        >
          {foodOptions.map((food, index) => (
            <div
              key={food}
              className="absolute w-full h-full text-white font-bold"
              style={{
                transform: `rotate(${index * (360 / foodOptions.length)}deg)`,
              }}
            >
              <span
                className="absolute left-1/2 -translate-x-1/2 top-4"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                {food}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-red-500 z-10" />
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className={`
          px-8 py-3 rounded-full text-xl font-bold text-white
          transform transition-all duration-200
          ${spinning
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600 hover:scale-105 active:scale-95 shadow-lg'
          }
        `}
      >
        {spinning ? '转转转...' : '开始转动'}
      </button>

      {result && (
        <div className="mt-8 text-2xl font-bold text-orange-600 animate-bounce">
          今天就吃 {result} 吧！
        </div>
      )}
    </div>
  );
}

export default App;