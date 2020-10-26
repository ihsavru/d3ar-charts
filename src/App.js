import React, { useState, useEffect } from 'react';
import LineChart from './components/LineChart';
import AreaChart from './components/AreaChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import DonutChart from './components/DonutChart';
import ScatterPlot from './components/ScatterPlot';
import HeatMap from './components/HeatMap';
import './App.css';

const heatMapdata = [];
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    const depth = Math.floor(Math.random() * 20 + 3);
    heatMapdata.push({
      label: i,
      value: j,
      depth,
      tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${j}<br><b>depth: </b>${depth}`,
    });
  }
}
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
        tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`,
      });
    }
    setData(chartData);
  }
  return (
    <div className="App">
      <button onClick={regenerateData}>Change Data</button>
      <HeatMap
        svgProps={{
          margin: { top: 80, bottom: 80, left: 80, right: 80 },
          width: 400,
          height: 400,
        }}
        axisProps={{
          xLabel: 'X Axis',
          yLabel: 'Y Axis',
        }}
        data={heatMapdata}
        strokeWidth={4}
      />
      <BarChart
        svgProps={{
          margin: { top: 80, bottom: 80, left: 80, right: 80 },
          width: 600,
          height: 400,
        }}
        axisProps={{
          xLabel: 'X Axis',
          yLabel: 'Y Axis',
        }}
        data={data}
        strokeWidth={4}
      />
      {/* <ScatterPlot
        svgProps={{
          margin: { top: 80, bottom: 80, left: 80, right: 80 },
          width: 600,
          height: 400,
        }}
        axisProps={{
          xLabel: 'X Axis',
          yLabel: 'Y Axis',
        }}
        data={data}
        pointWidth={4}
      />
      <AreaChart
        svgProps={{
          margin: { top: 80, bottom: 80, left: 80, right: 80 },
          width: 600,
          height: 400,
        }}
        axisProps={{
          xLabel: 'X Axis',
          yLabel: 'Y Axis',
        }}
        data={data}
        strokeWidth={4}
      /> */}
    </div>
  );
}

export default App;
