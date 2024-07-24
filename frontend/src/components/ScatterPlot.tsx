"use client";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { nivoDark, nivoLight } from "@/lib/nivoTheme";

type DataPoint = {
  x: number;
  y: number;
};

type Group = {
  id: string;
  data: DataPoint[];
};

type DataSet = Group[];

interface QuadrantLayerProps {
  xScale: (value: number) => number;
  yScale: (value: number) => number;
  xDomain: [number, number];
  yDomain: [number, number];
  innerWidth: number;
  innerHeight: number;
}

const QuadrantLayer = ({
  xScale,
  yScale,
  xDomain,
  yDomain,
  innerWidth,
  innerHeight,
}: QuadrantLayerProps) => {
  const middleX = xScale((xDomain[1] - xDomain[0]) / 2 + xDomain[0]);
  const middleY = yScale((yDomain[1] - yDomain[0]) / 2 + yDomain[0]);

  return (
    <g>
      {/* Horizontal Line */}
      <line
        x1={0}
        y1={middleY}
        x2={innerWidth}
        y2={middleY}
        stroke="black"
        strokeWidth={1}
      />
      {/* Vertical Line */}
      <line
        x1={middleX}
        y1={0}
        x2={middleX}
        y2={innerHeight}
        stroke="black"
        strokeWidth={1}
      />

      {/* Quadrant Labels */}
      <text
        x={middleX + 140}
        y={middleY - 240}
        style={{ fontSize: 15, fontWeight: "bold", fill: "#333" }}
      >
        Proven Excellence
      </text>
      <text
        x={middleX - 290}
        y={middleY - 240}
        style={{ fontSize: 15, fontWeight: "bold", fill: "#333" }}
      >
        Emerging Prospects
      </text>
      <text
        x={middleX - 290}
        y={middleY + 240}
        style={{ fontSize: 15, fontWeight: "bold", fill: "#333" }}
      >
        Foundational Merit
      </text>
      <text
        x={middleX + 140}
        y={middleY + 240}
        style={{ fontSize: 15, fontWeight: "bold", fill: "#333" }}
      >
        Operationally Effective
      </text>
    </g>
  );
};

const ScatterPlot = ({ data }: { data: DataSet }) => {
  const router = useRouter();

  const xDomain = [40, 85];
  const yDomain = [55, 95];

  const handleClick = async (e) => {
    const name = e.serieId;
    const id = e.data.modelId;
    router.push(`/catalog/${name}?id=${id}`);
  };

  const [cursorPointer, setCursorPointer] = useState<boolean>(false);

  return (
    <main className={clsx("bg-white", cursorPointer && "cursor-pointer")}>
      <div
        style={{ width: "1000px", height: "600px", maxWidth: "100%" }}
        className="mx-auto flex items-center space-x-2 mb-5"
      >
        <ResponsiveScatterPlot
          data={data}
          onClick={(e) => handleClick(e)}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
          useMesh={false}
          onMouseEnter={() => setCursorPointer(true)}
          onMouseLeave={() => setCursorPointer(false)}
          tooltip={({ node }) => (
            <div
              style={{
                background: "white",
                padding: "10px",
                border: "1px solid #ccc",
                textAlign: "center",
              }}
            >
              <strong>{node.serieId}</strong>
              <br />
            </div>
          )}
          xScale={{ type: "linear", min: 40, max: 85 }}
          xFormat=" >-.2f"
          yScale={{ type: "linear", min: 55, max: 95 }}
          yFormat=">-.2f"
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Business Readiness →",
            legendPosition: "middle",
            legendOffset: 46,
            truncateTickAt: 0,
            tickValues: [],
          }}
          axisLeft={{
            orient: "left",
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Perceived Business Value →",
            legendPosition: "middle",
            legendOffset: -60,
            truncateTickAt: 0,
            tickValues: [],
          }}
          nodeSize={40}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: "18px",
                },
              },
              legend: {
                text: {
                  fontSize: "20px",
                },
              },
            },
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 130,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 12,
              itemsSpacing: 5,
              itemDirection: "left-to-right",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          layers={[
            "axes",
            "nodes",
            "markers",
            "mesh",
            (props) => (
              <QuadrantLayer
                xScale={props.xScale}
                yScale={props.yScale}
                xDomain={xDomain}
                yDomain={yDomain}
                innerWidth={props.innerWidth}
                innerHeight={props.innerHeight}
              />
            ),
            "legends",
          ]}
        />
      </div>
    </main>
  );
};

export default ScatterPlot;
