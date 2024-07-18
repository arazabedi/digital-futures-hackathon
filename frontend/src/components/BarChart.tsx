"use client";

import { useState } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AnimatedAxis } from "@visx/react-spring";
import { defaultStyles, TooltipWithBounds, useTooltip } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { scaleBand, scaleLinear } from "@visx/scale";
import { timeFormat } from "d3-time-format";
import { TouchEvent, MouseEvent } from "react";
import { useSpring, animated } from "react-spring";
import appleStock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import useMeasure from "react-use-measure";

// data
const data = appleStock.slice(0, 10);

const getXValue = (d: AppleStock) => d.date;
const getYValue = (d: AppleStock) => d.close;

// margins
const margin = 32;

// width and height
const defaultWidth = 100;
const defaultHeight = 100;

// customise tooltip
const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "#6e0fca",
  color: "white",
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
};

const BarChart = () => {
  const [toggle, setToggle] = useState(true);

	const [ref, bounds] = useMeasure();

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<AppleStock>();

  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultHeight;

  // innerWidth and innerHeight
  const innerWidth = width - margin * 2.5;
  const innerHeight = height - margin * 3.5;

  // define the scales
  const xScale = scaleBand<string>({
    range: [margin, innerWidth],
    domain: data.map(getXValue),
    padding: 0.5,
  });

  const yScale = scaleLinear<number>({
    range: [innerHeight, margin],
    domain: [
      Math.min(...data.map(getYValue)) - 1,
      Math.max(...data.map(getYValue)) + 1,
    ],
  });

  // define gradient
  const gradientTop = "#FF0000";
  const gradientBottom = "#FFA500";

  // arrange the bar animations
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: toggle ? 1 : 0 },
  });
  const AnimatedBar = animated(Bar);

  // create the axes and group it all together
  return height < 0 ? null : (
    <>
      <button onClick={() => setToggle(!toggle)}>switch</button>
      <svg
        className="rounded-3xl"
        ref={ref}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
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
          {data.map((d) => {
            const xValue = getXValue(d);
            const barWidth = xScale.bandwidth();
            const barHeight = innerHeight - yScale(getYValue(d) ?? 0);
            const barX = margin + (xScale(xValue) ?? 0);
            const barY = innerHeight - barHeight + margin;
            return (
              <AnimatedBar
                key={`bar-${xValue}`}
                x={barX}
                y={scale.to((s) => innerHeight + margin - s * barHeight)}
                width={barWidth}
                height={scale.to((s) => s * barHeight)}
                fill="orange"
                onMouseMove={(
                  event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>
                ) => {
                  const point = localPoint(event);

                  if (!point) return;

                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: point.x,
                    tooltipTop: point.y,
                  });
                }}
                onMouseLeave={() => hideTooltip()}
              />
            );
          })}
        </Group>
        <Group>
					<AnimatedAxis
            strokeWidth={1}
            orientation="bottom"
            top={innerHeight + margin}
            left={margin}
            scale={xScale}
            tickFormat={(date) => timeFormat("%m/%d")(new Date(date.toString()))}
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
      {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
          offsetTop={65}
        >
          <b>{timeFormat("%b %d, %y")(new Date(getXValue(tooltipData)))}</b> :{" "}
          {getYValue(tooltipData)}
        </TooltipWithBounds>
      ) : null}
    </>
  );
};

export default BarChart;
