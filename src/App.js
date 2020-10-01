import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    regenerateData();
  }, []);

  function regenerateData() {
    const chartData = [];
    for (let i = 0; i < 20; i++) {
      const value = Math.floor(Math.random() * i + 3);
      chartData.push({
        label: i,
        value,
        tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`
      });
    }
    setData(chartData)
  }
  return (
    <div className="App">
      <button onClick={regenerateData}>Change Data</button>
      <LineChart data={data} width={400} height={300} />
    </div>
  );
}

export default App;
