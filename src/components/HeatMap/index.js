import BaseChart from '../BaseChart';
import classnames from 'classnames';
import * as d3 from 'd3';
import { scaleBandInvert } from '../../utils/invertScale';

import './index.scss';

function drawHeatMap(props) {
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
  const depthMinValue = d3.min(data, (d) => d.depth);
  const depthMaxValue = d3.max(data, (d) => d.depth);

  const colorScale = d3
    .scaleLinear()
    .range(['#fff5f7', '#e3a8b7'])
    .domain([depthMinValue, depthMaxValue]);

  svg
    .selectAll()
    .data(data, function(d) {return d.depth+':'+d.value;})
    .enter()
    .append("rect")
    .attr("x", function(d) { return xScale(d.label) })
    .attr("y", function(d) { return yScale(d.value) })
    .attr("width", xScale.bandwidth() )
    .attr("height", yScale.bandwidth() )
    .style("fill", function(d) { return colorScale(d.depth)} );
}

function findHoverData(event, height, data, xScale, yScale) {
  const [xPos, yPos] = event;
  const xInvertedPoint = scaleBandInvert(xScale, xPos);
  const yInvertedPoint = scaleBandInvert(yScale, height - yPos);

  const d0 = data.filter(({ label, value }) => label === xInvertedPoint && value === yInvertedPoint)[0];
  return d0;
}

const useScaleBands = { x: true, y: true };
const extraProps = {
  useScaleBands,
  drawXGridlines: false,
  drawYGridlines: false,
  xLabel: '',
  yLabel: '',
  axisClass: 'heatmap__axis',
  findHoverData,
}
export default BaseChart(drawHeatMap, extraProps);
