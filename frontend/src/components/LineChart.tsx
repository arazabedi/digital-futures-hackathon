"use client";

import appleStock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { AnimatedAxis } from "@visx/react-spring";
import { Group } from "@visx/group";
import useMeasure from "react-use-measure";
import { scaleTime, scaleLinear } from "@visx/scale";
import { timeFormat } from "d3-time-format";
import * as allCurves from "@visx/curve";
import { LinePath } from "@visx/shape";
import { defaultStyles, TooltipWithBounds, useTooltip } from "@visx/tooltip";
import {
  MarkerArrow,
  MarkerCross,
  MarkerX,
  MarkerCircle,
  MarkerLine,
  Marker,
} from "@visx/marker";
import { extent, max, min } from "d3";
import { useState } from "react";

const data = appleStock.slice(0, 10);

const getXValue = (d: AppleStock) => new Date(d.date);
const getYValue = (d: AppleStock) => d.close;

const margin = 32;

const defaultWidth = 100;
const defaultHeight = 100;

const gradientTop = "#FFB6C1";
const gradientBottom = "#87CEFA";

const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "#6e0fca",
  color: "white",
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
};

type CurveType = keyof typeof allCurves;
const curveTypes = Object.keys(allCurves);

const LineChart = () => {
  const [ref, bounds] = useMeasure();
  const [curveType, setCurveType] = useState<CurveType>("curveNatural");

  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultHeight;

  const innerWidth = width - margin * 2.5;
  const innerHeight = height - margin * 3.5;

  const xScale = scaleTime({
    range: [0, innerWidth - margin],
    domain: extent(data, getXValue) as [Date, Date],
  });

  const yScale = scaleLinear<number>({
    range: [innerHeight + margin, margin],
    domain: [
      (min(data, getYValue) as number) - 1,
      (max(data, getYValue) as number) + 1,
    ],
  });

  return (
    <>
      <label htmlFor="curves">Choose a curve:</label>
      <label>
        Curve type &nbsp;
        <select
          onChange={(e) => setCurveType(e.target.value as CurveType)}
          value={curveType}
        >
          {curveTypes.map((curve) => (
            <option key={curve} value={curve}>
              {curve}
            </option>
          ))}
        </select>
      </label>
      <svg className="rounded-3xl" ref={ref} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: gradientTop, stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: gradientBottom, stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" />
        <Group>
          <LinePath
            curve={allCurves[curveType]}
            data={data}
            x={(d) => xScale(getXValue(d)) ?? 0}
            y={(d) => yScale(getYValue(d)) ?? 0}
            stroke="#333"
            strokeWidth={1}
            shapeRendering="geometricPrecision"
          />
        </Group>
        <Group>
          <AnimatedAxis
            strokeWidth={1}
            orientation="bottom"
            top={innerHeight + margin * 2}
            left={margin * 2}
            scale={xScale}
            tickFormat={(date) =>
              timeFormat("%m/%d")(new Date(date.toString()))
            }
            hideTicks={false}
            tickLabelProps={{
              fill: "black",
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em",
              x: "1rem",
            }}
          />
        </Group>
        <Group>
          <AnimatedAxis
            orientation="left"
            left={margin * 2}
            scale={yScale}
            strokeWidth={1}
            hideTicks={false}
            top={margin}
            tickLabelProps={{
              fill: "black",
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em",
              x: "-.2rem",
            }}
          />
        </Group>
      </svg>
    </>
  );
};

export default LineChart;
