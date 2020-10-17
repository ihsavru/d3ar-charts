import React, { forwardRef, useEffect } from 'react';
import * as d3 from 'd3';
import classnames from 'classnames';

function drawAxis(config) {
  const {
    margin,
    width,
    height,
    drawXAxis,
    drawYAxis,
    drawXGridlines,
    drawYGridlines,
    xLabel,
    yLabel,
    axisClass,
    gridClass,
    data,
    svgRef,
    xScale,
    yScale,
  } = config;

  const svg = d3.select(svgRef.current).select('g');

  if (drawYGridlines)
    svg
      .append('g')
      .attr('class', classnames(['base__gridlines gridlines__y', gridClass]))
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(xScale)
          .tickSize(-height)
          .tickFormat(''),
      );

  if (drawXGridlines)
    svg
      .append('g')
      .attr('class', classnames(['base__gridlines gridlines__x', gridClass]))
      .call(
        d3.axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(''),
      );

  svg
    .append('g')
    .attr('class', classnames(['base__axis axis__x', axisClass]))
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  svg
    .append('g')
    .attr('class', classnames(['base__axis axis__y', axisClass]))
    .call(d3.axisLeft(yScale));

  if (xLabel)
    svg
      .append('text')
      .attr('class', 'base__axis-label axis__x-label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.top / 2)
      .text(xLabel);

  if (yLabel)
    svg
      .append('text')
      .attr('class', 'base__axis-label axis__y-label')
      .attr('text-anchor', 'middle')
      .attr('x', -height / 2)
      .attr('y', -margin.left / 2)
      .attr('transform', 'rotate(-90)')
      .text(yLabel);

};

export default drawAxis;
