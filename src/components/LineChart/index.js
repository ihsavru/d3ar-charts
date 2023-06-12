import BaseChart from '../BaseChart';
import classnames from 'classnames';
import * as d3 from 'd3';

import './index.scss';

function drawLineChart(props) {
  const {
    svgRef,
    data,
    xScale,
    yScale,
    width,
    height,
    margin,
    lineClass,
    strokeWidth,
  } = props;

  const svg = d3.select(svgRef.current).select('g');

  const line = d3
    .line()
    .x((d) => xScale(d.label))
    .y((d) => yScale(d.value))
    .curve(d3.curveMonotoneX);

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke-width', strokeWidth)
    .attr('class', 'line')
    .attr('d', line)
    .attr('class', classnames(['line-chart__path', lineClass]));
}

const extraProps = {
  useScaleBands: { x: true, y: false },
};

export default BaseChart(drawLineChart, extraProps);
