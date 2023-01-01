import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <div>Hackathon project frontend</div>
      <div>Count: {count}</div>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export default App;
