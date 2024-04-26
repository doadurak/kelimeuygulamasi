import React, { useState } from 'react';

const App: React.FC = () => {
  // State tanımlama
  const [count, setCount] = useState<number>(0);

  // Artırma fonksiyonu
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Azaltma fonksiyonu
  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default App;