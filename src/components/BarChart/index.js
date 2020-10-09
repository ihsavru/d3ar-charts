// @flow weak
import React, { useEffect } from 'react';
import * as d3 from 'd3';

import './index.scss';

function BarChart(props) {
  const {
    data, width, height, containerId, margin, tooltipId,
  } = props;

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    // Remove the old chart
    d3.select(`#${containerId}`)
      .select('svg')
      .remove();

    // Remove the old tooltip
    d3.select(`#${containerId}`)
      .select('.tooltip')
      .remove();

    const yMinValue = d3.min(data, (d) => d.value);
    const yMaxValue = d3.max(data, (d) => d.value);

    const xMinValue = d3.min(data, (d) => d.label);
    const xMaxValue = d3.max(data, (d) => d.label);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.label))
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, yMaxValue]);

    d3
      .select(`#${containerId}`)
      .style('width', `${width + margin.right + margin.left}px`)
      .style('height', `${height + margin.top + margin.bottom}px`);

    const svg = d3
      .select(`#${containerId}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Append the gridlines along the Y-axis
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(xScale)
          .tickSize(-height)
          .tickFormat(''),
      );

    // Append the gridlines along the X-axis
    svg
      .append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(''),
      );

    // Append the path going through the data points
    svg
      .selectAll('bar')
      .data(data)
      .enter().append('rect')
      .style('fill', 'steelblue')
      .attr('x', (d) => xScale(d.label))
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => height - yScale(d.value));

    // Append the X-axis
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom().scale(xScale).tickSize(15));

    // Append the Y-axis
    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

    svg
      .append('text')
      .attr('class', 'x-label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .text('X Axis');

    svg
      .append('text')
      .attr('class', 'y-label')
      .attr('text-anchor', 'middle')
      .attr('x', -height / 2)
      .attr('y', -margin.left / 2)
      .attr('transform', 'rotate(-90)')
      .text('Y Axis');
  }

  return <div id={containerId} className="container" />;
}

export default BarChart;
