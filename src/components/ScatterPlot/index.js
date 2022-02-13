import BaseChart from '../BaseChart';
import classnames from 'classnames';
import * as d3 from 'd3';

import './index.scss';

function drawScatterPlot(props) {
  const {
    svgRef,
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

  svg.append('g')
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.label))
    .attr('cy', (d) => yScale(d.value))
    .attr('r', pointWidth)
    .attr('class', classnames(['scatter-plot__point', pointClass]));
}

const extraProps = {
  useScaleBands: { x: true, y: false },
};

export default BaseChart(drawScatterPlot, extraProps);
