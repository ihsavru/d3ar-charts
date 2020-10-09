import BaseChart from '../BaseChart';
import classnames from 'classnames';
import * as d3 from 'd3';

import './index.scss';

function drawScatterPlot(props) {
  const {
    svgRef,
    tooltipRef,
    data,
    xScale,
    yScale,
    width,
    height,
    margin,
    pointClass,
    pointWidth,
  } = props;

  const svg = d3.select(svgRef.current).select('g');
  const tooltip = d3.select(tooltipRef.current);

  svg.append('g')
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.label))
    .attr('cy', (d) => yScale(d.value))
    .attr('r', pointWidth)
    .attr('class', classnames(['scatter-plot__point', pointClass]));

  svg
    .append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .style('opacity', 0)
    .on('mouseout', () => {
      tooltip
        .transition()
        .duration(300)
        .style('opacity', 0);
    })
    .on('mousemove', mousemove);

  function mousemove(event) {
    const bisect = d3.bisector((d) => d.label).left;
    const xPos = d3.mouse(this)[0];
    const x0 = bisect(data, xScale.invert(xPos));
    const d0 = data[x0];

    tooltip
      .transition()
      .duration(300)
      .style('opacity', 0.9);

    tooltip
      .html(d0.tooltipContent || d0.label)
      .style(
        'transform',
        'translate(-50%,-100%)',
      )
      .style(
        'left',
        `${xScale(d0.label) + margin.left}px`,
      )
      .style(
        'top',
        `${yScale(d0.value) + margin.top - 10}px`,
      );
  }
}

export default BaseChart(drawScatterPlot);
