import BaseChart from '../BaseChart';
import classnames from 'classnames';
import * as d3 from 'd3';

import './index.scss';

function drawBarChart(props) {
  const {
    svgRef,
    data,
    xScale,
    yScale,
    width,
    height,
    margin,
    barClass,
  } = props;

  const svg = d3.select(svgRef.current).select('g');

  svg
    .selectAll('bar')
    .data(data)
    .enter().append('rect')
    .attr('class', classnames(['bar-chart__bar', barClass]))
    .attr('x', (d) => xScale(d.label))
    .attr('width', xScale.bandwidth())
    .attr('y', (d) => yScale(d.value))
    .attr('height', (d) => height - yScale(d.value));
}

const extraProps = {
  useScaleBands: { x: true, y: false },
};

export default BaseChart(drawBarChart, extraProps);
